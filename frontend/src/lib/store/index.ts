import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { authStore, AuthState } from './auth-store';
import { businessStore, BusinessState } from './business-store';
import { orderStore, OrderState } from './order-store';
import { deliveryStore, DeliveryState } from './delivery-store';
import { chatStore, ChatState } from './chat-store';
import { uiStore, UIState } from './ui-store';

export const useStore = create<AuthState & BusinessState & OrderState & DeliveryState & ChatState & UIState>()(
  devtools(
    persist(
      (...a) => ({
        ...authStore(...a),
        ...businessStore(...a),
        ...orderStore(...a),
        ...deliveryStore(...a),
        ...chatStore(...a),
        ...uiStore(...a),
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          business: state.business,
          theme: state.theme,
          language: state.language,
        }),
      }
    )
  )
);