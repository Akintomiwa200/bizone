import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  messageId: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'image', 'document', 'template', 'audio', 'video', 'location'],
    default: 'text'
  },
  content: {
    type: String,
    required: true
  },
  mediaUrl: String,
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read', 'failed'],
    default: 'sent'
  },
  direction: {
    type: String,
    enum: ['inbound', 'outbound'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    templateName: String,
    templateParameters: [String],
    error: String
  }
});

const chatSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  contact: {
    phone: {
      type: String,
      required: true
    },
    name: String,
    isBusiness: {
      type: Boolean,
      default: false
    },
    profilePicture: String
  },
  messages: [messageSchema],
  status: {
    type: String,
    enum: ['active', 'archived', 'blocked'],
    default: 'active'
  },
  lastMessageAt: {
    type: Date,
    default: Date.now
  },
  unreadCount: {
    type: Number,
    default: 0
  },
  tags: [String],
  notes: String
}, {
  timestamps: true
});

// Index for efficient queries
chatSchema.index({ business: 1, 'contact.phone': 1 });
chatSchema.index({ lastMessageAt: -1 });
chatSchema.index({ business: 1, status: 1 });

// Method to get or create chat session
chatSchema.statics.getOrCreateChat = async function(businessId, phoneNumber, contactInfo = {}) {
  let chat = await this.findOne({
    business: businessId,
    'contact.phone': phoneNumber
  });

  if (!chat) {
    chat = await this.create({
      business: businessId,
      contact: {
        phone: phoneNumber,
        name: contactInfo.name,
        isBusiness: contactInfo.isBusiness || false,
        profilePicture: contactInfo.profilePicture
      }
    });
  }

  return chat;
};

// Method to add message to chat
chatSchema.methods.addMessage = function(messageData) {
  this.messages.push(messageData);
  this.lastMessageAt = new Date();
  
  if (messageData.direction === 'inbound') {
    this.unreadCount += 1;
  }
  
  return this.save();
};

// Method to mark messages as read
chatSchema.methods.markAsRead = function() {
  this.unreadCount = 0;
  this.messages.forEach(msg => {
    if (msg.direction === 'inbound' && msg.status !== 'read') {
      msg.status = 'read';
    }
  });
  return this.save();
};

export default mongoose.model('Chat', chatSchema);

