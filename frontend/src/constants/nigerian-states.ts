// Nigerian states and geographical data

export interface NigerianState {
  id: string;
  name: string;
  capital: string;
  region: string;
  zone: string;
  lgas: string[];
  population?: number;
  area?: number; // in square kilometers
  postalCodePrefix: string;
}

export const NIGERIAN_STATES: NigerianState[] = [
  {
    id: 'abia',
    name: 'Abia',
    capital: 'Umuahia',
    region: 'South East',
    zone: 'SE',
    lgas: [
      'Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North',
      'Isiala Ngwa South', 'Isuikwuato', 'Obi Ngwa', 'Ohafia', 'Osisioma', 'Ugwunagbo',
      'Ukwa East', 'Ukwa West', 'Umuahia North', 'Umuahia South', 'Umu Nneochi'
    ],
    population: 2845380,
    area: 6320,
    postalCodePrefix: '440'
  },
  {
    id: 'adamawa',
    name: 'Adamawa',
    capital: 'Yola',
    region: 'North East',
    zone: 'NE',
    lgas: [
      'Demsa', 'Fufure', 'Ganye', 'Gayuk', 'Gombi', 'Grie', 'Hong', 'Jada', 'Lamurde',
      'Madagali', 'Maiha', 'Mayo Belwa', 'Michika', 'Mubi North', 'Mubi South', 'Numan',
      'Shelleng', 'Song', 'Toungo', 'Yola North', 'Yola South'
    ],
    population: 3178950,
    area: 36917,
    postalCodePrefix: '640'
  },
  {
    id: 'akwa-ibom',
    name: 'Akwa Ibom',
    capital: 'Uyo',
    region: 'South South',
    zone: 'SS',
    lgas: [
      'Abak', 'Eastern Obolo', 'Eket', 'Esit Eket', 'Essien Udim', 'Etim Ekpo', 'Etinan',
      'Ibeno', 'Ibesikpo Asutan', 'Ibiono-Ibom', 'Ika', 'Ikono', 'Ikot Abasi', 'Ikot Ekpene',
      'Ini', 'Itu', 'Mbo', 'Mkpat-Enin', 'Nsit-Atai', 'Nsit-Ibom', 'Nsit-Ubium', 'Obot Akara',
      'Okobo', 'Onna', 'Oron', 'Oruk Anam', 'Udung-Uko', 'Ukanafun', 'Uruan', 'Urue-Offong/Oruko', 'Uyo'
    ],
    population: 5482180,
    area: 7081,
    postalCodePrefix: '520'
  },
  {
    id: 'anambra',
    name: 'Anambra',
    capital: 'Awka',
    region: 'South East',
    zone: 'SE',
    lgas: [
      'Aguata', 'Anambra East', 'Anambra West', 'Anaocha', 'Awka North', 'Awka South',
      'Ayamelum', 'Dunukofia', 'Ekwusigo', 'Idemili North', 'Idemili South', 'Ihiala',
      'Njikoka', 'Nnewi North', 'Nnewi South', 'Ogbaru', 'Onitsha North', 'Onitsha South',
      'Orumba North', 'Orumba South', 'Oyi'
    ],
    population: 5527800,
    area: 4844,
    postalCodePrefix: '420'
  },
  {
    id: 'bauchi',
    name: 'Bauchi',
    capital: 'Bauchi',
    region: 'North East',
    zone: 'NE',
    lgas: [
      'Alkaleri', 'Bauchi', 'Bogoro', 'Damban', 'Darazo', 'Dass', 'Gamawa', 'Ganjuwa',
      'Giade', 'Itas/Gadau', 'Jama are', 'Katagum', 'Kirfi', 'Misau', 'Ningi', 'Shira',
      'Tafawa Balewa', 'Toro', 'Warji', 'Zaki'
    ],
    population: 4939500,
    area: 45837,
    postalCodePrefix: '740'
  },
  {
    id: 'bayelsa',
    name: 'Bayelsa',
    capital: 'Yenagoa',
    region: 'South South',
    zone: 'SS',
    lgas: [
      'Brass', 'Ekeremor', 'Kolokuma/Opokuma', 'Nembe', 'Ogbia', 'Sagbama', 'Southern Ijaw', 'Yenagoa'
    ],
    population: 2278000,
    area: 10773,
    postalCodePrefix: '561'
  },
  {
    id: 'benue',
    name: 'Benue',
    capital: 'Makurdi',
    region: 'North Central',
    zone: 'NC',
    lgas: [
      'Ado', 'Agatu', 'Apa', 'Buruku', 'Gboko', 'Guma', 'Gwer East', 'Gwer West',
      'Katsina-Ala', 'Konshisha', 'Kwande', 'Logo', 'Makurdi', 'Obi', 'Ogbadibo',
      'Ohimini', 'Oju', 'Okpokwu', 'Oturkpo', 'Tarka', 'Ukum', 'Ushongo', 'Vandeikya'
    ],
    population: 5741800,
    area: 34059,
    postalCodePrefix: '970'
  },
  {
    id: 'borno',
    name: 'Borno',
    capital: 'Maiduguri',
    region: 'North East',
    zone: 'NE',
    lgas: [
      'Abadam', 'Askira/Uba', 'Bama', 'Bayo', 'Biu', 'Chibok', 'Damboa', 'Dikwa',
      'Gubio', 'Guzamala', 'Gwoza', 'Hawul', 'Jere', 'Kaga', 'Kala/Balge', 'Konduga',
      'Kukawa', 'Kwaya Kusar', 'Mafa', 'Magumeri', 'Maiduguri', 'Marte', 'Mobbar',
      'Monguno', 'Ngala', 'Nganzai', 'Shani'
    ],
    population: 5861800,
    area: 70898,
    postalCodePrefix: '600'
  },
  {
    id: 'cross-river',
    name: 'Cross River',
    capital: 'Calabar',
    region: 'South South',
    zone: 'SS',
    lgas: [
      'Abi', 'Akamkpa', 'Akpabuyo', 'Bakassi', 'Bekwarra', 'Biase', 'Boki', 'Calabar Municipal',
      'Calabar South', 'Etung', 'Ikom', 'Obanliku', 'Obubra', 'Obudu', 'Odukpani', 'Ogoja', 'Yakuur', 'Yala'
    ],
    population: 3866600,
    area: 20156,
    postalCodePrefix: '540'
  },
  {
    id: 'delta',
    name: 'Delta',
    capital: 'Asaba',
    region: 'South South',
    zone: 'SS',
    lgas: [
      'Aniocha North', 'Aniocha South', 'Bomadi', 'Burutu', 'Ethiope East', 'Ethiope West',
      'Ika North East', 'Ika South', 'Isoko North', 'Isoko South', 'Ndokwa East', 'Ndokwa West',
      'Okpe', 'Oshimili North', 'Oshimili South', 'Patani', 'Sapele', 'Udu', 'Ughelli North',
      'Ughelli South', 'Ukwuani', 'Uvwie', 'Warri North', 'Warri South', 'Warri South West'
    ],
    population: 5663360,
    area: 17698,
    postalCodePrefix: '320'
  },
  {
    id: 'ebonyi',
    name: 'Ebonyi',
    capital: 'Abakaliki',
    region: 'South East',
    zone: 'SE',
    lgas: [
      'Abakaliki', 'Afikpo North', 'Afikpo South', 'Ebonyi', 'Ezza North', 'Ezza South',
      'Ikwo', 'Ishielu', 'Ivo', 'Izzi', 'Ohaozara', 'Ohaukwu', 'Onicha'
    ],
    population: 2884560,
    area: 5670,
    postalCodePrefix: '490'
  },
  {
    id: 'edo',
    name: 'Edo',
    capital: 'Benin City',
    region: 'South South',
    zone: 'SS',
    lgas: [
      'Akoko-Edo', 'Egor', 'Esan Central', 'Esan North-East', 'Esan South-East', 'Esan West',
      'Etsako Central', 'Etsako East', 'Etsako West', 'Igueben', 'Ikpoba Okha', 'Orhionmwon',
      'Oredo', 'Ovia North-East', 'Ovia South-West', 'Owan East', 'Owan West', 'Uhunmwonde'
    ],
    population: 4235590,
    area: 17802,
    postalCodePrefix: '300'
  },
  {
    id: 'ekiti',
    name: 'Ekiti',
    capital: 'Ado-Ekiti',
    region: 'South West',
    zone: 'SW',
    lgas: [
      'Ado Ekiti', 'Efon', 'Ekiti East', 'Ekiti South-West', 'Ekiti West', 'Emure',
      'Gbonyin', 'Ido Osi', 'Ijero', 'Ikere', 'Ikole', 'Ilejemeje', 'Irepodun/Ifelodun',
      'Ise/Orun', 'Moba', 'Oye'
    ],
    population: 3270340,
    area: 6353,
    postalCodePrefix: '360'
  },
  {
    id: 'enugu',
    name: 'Enugu',
    capital: 'Enugu',
    region: 'South East',
    zone: 'SE',
    lgas: [
      'Aninri', 'Awgu', 'Enugu East', 'Enugu North', 'Enugu South', 'Ezeagu', 'Igbo Etiti',
      'Igbo Eze North', 'Igbo Eze South', 'Isi Uzo', 'Nkanu East', 'Nkanu West', 'Nsukka',
      'Oji River', 'Udenu', 'Udi', 'Uzo Uwani'
    ],
    population: 4324720,
    area: 7161,
    postalCodePrefix: '400'
  },
  {
    id: 'gombe',
    name: 'Gombe',
    capital: 'Gombe',
    region: 'North East',
    zone: 'NE',
    lgas: [
      'Akko', 'Balanga', 'Billiri', 'Dukku', 'Funakaye', 'Gombe', 'Kaltungo', 'Kwami', 'Nafada', 'Shongom', 'Yamaltu/Deba'
    ],
    population: 3256960,
    area: 18768,
    postalCodePrefix: '760'
  },
  {
    id: 'imo',
    name: 'Imo',
    capital: 'Owerri',
    region: 'South East',
    zone: 'SE',
    lgas: [
      'Aboh Mbaise', 'Ahiazu Mbaise', 'Ehime Mbano', 'Ezinihitte', 'Ideato North', 'Ideato South',
      'Ihitte/Uboma', 'Ikeduru', 'Isiala Mbano', 'Isu', 'Mbaitoli', 'Ngor Okpala', 'Njaba',
      'Nkwerre', 'Nwangele', 'Obowo', 'Oguta', 'Ohaji/Egbema', 'Okigwe', 'Orlu', 'Orsu',
      'Oru East', 'Oru West', 'Owerri Municipal', 'Owerri North', 'Owerri West', 'Unuimo'
    ],
    population: 5408430,
    area: 5530,
    postalCodePrefix: '460'
  },
  {
    id: 'jigawa',
    name: 'Jigawa',
    capital: 'Dutse',
    region: 'North West',
    zone: 'NW',
    lgas: [
      'Auyo', 'Babura', 'Biriniwa', 'Birnin Kudu', 'Buji', 'Dutse', 'Gagarawa', 'Garki',
      'Gumel', 'Guri', 'Gwaram', 'Gwiwa', 'Hadejia', 'Jahun', 'Kafin Hausa', 'Kazaure',
      'Kiri Kasama', 'Kiyawa', 'Kaugama', 'Maigatari', 'Malam Madori', 'Miga', 'Ringim',
      'Roni', 'Sule Tankarkar', 'Taura', 'Yankwashi'
    ],
    population: 5865800,
    area: 23154,
    postalCodePrefix: '720'
  },
  {
    id: 'kaduna',
    name: 'Kaduna',
    capital: 'Kaduna',
    region: 'North West',
    zone: 'NW',
    lgas: [
      'Birnin Gwari', 'Chikun', 'Giwa', 'Igabi', 'Ikara', 'Jaba', 'Jema a', 'Kachia',
      'Kaduna North', 'Kaduna South', 'Kagarko', 'Kajuru', 'Kaura', 'Kauru', 'Kubau',
      'Kudan', 'Lere', 'Makarfi', 'Sabon Gari', 'Sanga', 'Soba', 'Zangon Kataf', 'Zaria'
    ],
    population: 8252360,
    area: 46053,
    postalCodePrefix: '800'
  },
  {
    id: 'kano',
    name: 'Kano',
    capital: 'Kano',
    region: 'North West',
    zone: 'NW',
    lgas: [
      'Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta',
      'Dawakin Kudu', 'Dawakin Tofa', 'Doguwa', 'Fagge', 'Gabasawa', 'Garko', 'Garun Mallam',
      'Gaya', 'Gezawa', 'Gwale', 'Gwarzo', 'Kabo', 'Kano Municipal', 'Karaye', 'Kibiya',
      'Kiru', 'Kumbotso', 'Kunchi', 'Kura', 'Madobi', 'Makoda', 'Minjibir', 'Nasarawa',
      'Rano', 'Rimin Gado', 'Rogo', 'Shanono', 'Sumaila', 'Takai', 'Tarauni', 'Tofa', 'Tsanyawa', 'Tudun Wada', 'Ungogo', 'Warawa', 'Wudil'
    ],
    population: 13076860,
    area: 20131,
    postalCodePrefix: '700'
  },
  {
    id: 'katsina',
    name: 'Katsina',
    capital: 'Katsina',
    region: 'North West',
    zone: 'NW',
    lgas: [
      'Bakori', 'Batagarawa', 'Batsari', 'Baure', 'Bindawa', 'Charanchi', 'Dandume',
      'Danja', 'Dan Musa', 'Daura', 'Dutsi', 'Dutsin Ma', 'Faskari', 'Funtua', 'Ingawa',
      'Jibia', 'Kafur', 'Kaita', 'Kankara', 'Kankia', 'Katsina', 'Kurfi', 'Kusada',
      'Mai Adua', 'Malumfashi', 'Mani', 'Mashi', 'Matazu', 'Musawa', 'Rimi', 'Sabuwa',
      'Safana', 'Sandamu', 'Zango'
    ],
    population: 7831280,
    area: 24192,
    postalCodePrefix: '820'
  },
  {
    id: 'kebbi',
    name: 'Kebbi',
    capital: 'Birnin Kebbi',
    region: 'North West',
    zone: 'NW',
    lgas: [
      'Aleiro', 'Arewa Dandi', 'Argungu', 'Augie', 'Bagudo', 'Birnin Kebbi', 'Bunza',
      'Dandi', 'Fakai', 'Gwandu', 'Jega', 'Kalgo', 'Koko/Besse', 'Maiyama', 'Ngaski',
      'Sakaba', 'Shanga', 'Suru', 'Danko/Wasagu', 'Yauri', 'Zuru'
    ],
    population: 4440050,
    area: 36800,
    postalCodePrefix: '860'
  },
  {
    id: 'kogi',
    name: 'Kogi',
    capital: 'Lokoja',
    region: 'North Central',
    zone: 'NC',
    lgas: [
      'Adavi', 'Ajaokuta', 'Ankpa', 'Bassa', 'Dekina', 'Ibaji', 'Idah', 'Igalamela Odolu',
      'Ijumu', 'Kabba/Bunu', 'Kogi', 'Lokoja', 'Mopa Muro', 'Ofu', 'Ogori/Magongo',
      'Okehi', 'Okene', 'Olamaboro', 'Omala', 'Yagba East', 'Yagba West'
    ],
    population: 4474310,
    area: 29833,
    postalCodePrefix: '260'
  },
  {
    id: 'kwara',
    name: 'Kwara',
    capital: 'Ilorin',
    region: 'North Central',
    zone: 'NC',
    lgas: [
      'Asa', 'Baruten', 'Edu', 'Ekiti', 'Ifelodun', 'Ilorin East', 'Ilorin South',
      'Ilorin West', 'Irepodun', 'Isin', 'Kaiama', 'Moro', 'Offa', 'Oke Ero', 'Oyun', 'Pategi'
    ],
    population: 3192250,
    area: 36825,
    postalCodePrefix: '240'
  },
  {
    id: 'lagos',
    name: 'Lagos',
    capital: 'Ikeja',
    region: 'South West',
    zone: 'SW',
    lgas: [
      'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry',
      'Epe', 'Eti Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe',
      'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'
    ],
    population: 12590300,
    area: 3345,
    postalCodePrefix: '100'
  },
  {
    id: 'nasarawa',
    name: 'Nasarawa',
    capital: 'Lafia',
    region: 'North Central',
    zone: 'NC',
    lgas: [
      'Akwanga', 'Awe', 'Doma', 'Karu', 'Keana', 'Keffi', 'Kokona', 'Lafia', 'Nasarawa', 'Nasarawa Egon', 'Obi', 'Toto', 'Wamba'
    ],
    population: 2522380,
    area: 27117,
    postalCodePrefix: '962'
  },
  {
    id: 'niger',
    name: 'Niger',
    capital: 'Minna',
    region: 'North Central',
    zone: 'NC',
    lgas: [
      'Agaie', 'Agwara', 'Bida', 'Borgu', 'Bosso', 'Chanchaga', 'Edati', 'Gbako',
      'Gurara', 'Katcha', 'Kontagora', 'Lapai', 'Lavun', 'Magama', 'Mariga', 'Mashegu',
      'Mokwa', 'Moya', 'Paikoro', 'Rafi', 'Rijau', 'Shiroro', 'Suleja', 'Tafa', 'Wushishi'
    ],
    population: 5556240,
    area: 76363,
    postalCodePrefix: '920'
  },
  {
    id: 'ogun',
    name: 'Ogun',
    capital: 'Abeokuta',
    region: 'South West',
    zone: 'SW',
    lgas: [
      'Abeokuta North', 'Abeokuta South', 'Ado-Odo/Ota', 'Egbado North', 'Egbado South',
      'Ewekoro', 'Ifo', 'Ijebu East', 'Ijebu North', 'Ijebu North East', 'Ijebu Ode',
      'Ikenne', 'Imeko Afon', 'Ipokia', 'Obafemi Owode', 'Odeda', 'Odogbolu', 'Ogun Waterside',
      'Remo North', 'Shagamu', 'Yewa North', 'Yewa South'
    ],
    population: 5217700,
    area: 16762,
    postalCodePrefix: '110'
  },
  {
    id: 'ondo',
    name: 'Ondo',
    capital: 'Akure',
    region: 'South West',
    zone: 'SW',
    lgas: [
      'Akoko North-East', 'Akoko North-West', 'Akoko South-East', 'Akoko South-West',
      'Akure North', 'Akure South', 'Ese Odo', 'Idanre', 'Ifedore', 'Ilaje', 'Ile Oluji/Okeigbo',
      'Irele', 'Odigbo', 'Okitipupa', 'Ondo East', 'Ondo West', 'Ose', 'Owo'
    ],
    population: 4672940,
    area: 15500,
    postalCodePrefix: '340'
  },
  {
    id: 'osun',
    name: 'Osun',
    capital: 'Oshogbo',
    region: 'South West',
    zone: 'SW',
    lgas: [
      'Aiyedade', 'Aiyedire', 'Atakunmosa East', 'Atakunmosa West', 'Boluwaduro',
      'Boripe', 'Ede North', 'Ede South', 'Egbedore', 'Ejigbo', 'Ife Central',
      'Ife East', 'Ife North', 'Ife South', 'Ifedayo', 'Ifelodun', 'Ila', 'Ilesa East',
      'Ilesa West', 'Irepodun', 'Irewole', 'Isokan', 'Iwo', 'Obokun', 'Odo Otin', 'Ola Oluwa',
      'Olorunda', 'Oriade', 'Orolu', 'Osogbo'
    ],
    population: 4709570,
    area: 9251,
    postalCodePrefix: '230'
  },
  {
    id: 'oyo',
    name: 'Oyo',
    capital: 'Ibadan',
    region: 'South West',
    zone: 'SW',
    lgas: [
      'Afijio', 'Akinyele', 'Atiba', 'Atisbo', 'Egbeda', 'Ibadan North', 'Ibadan North-East',
      'Ibadan North-West', 'Ibadan South-East', 'Ibadan South-West', 'Ibarapa Central',
      'Ibarapa East', 'Ibarapa North', 'Ido', 'Irepo', 'Iseyin', 'Itesiwaju', 'Iwajowa',
      'Kajola', 'Lagelu', 'Ogbomosho North', 'Ogbomosho South', 'Ogo Oluwa', 'Olorunsogo',
      'Oluyole', 'Ona Ara', 'Orelope', 'Ori Ire', 'Oyo East', 'Oyo West', 'Saki East',
      'Saki West', 'Surulere'
    ],
    population: 7840880,
    area: 28454,
    postalCodePrefix: '200'
  },
  {
    id: 'plateau',
    name: 'Plateau',
    capital: 'Jos',
    region: 'North Central',
    zone: 'NC',
    lgas: [
      'Bokkos', 'Barkin Ladi', 'Bassa', 'Jos East', 'Jos North', 'Jos South', 'Kanam',
      'Kanke', 'Langtang South', 'Langtang North', 'Mangu', 'Mikang', 'Pankshin', 'Qua an Pan', 'Riyom', 'Shendam', 'Wase'
    ],
    population: 4195000,
    area: 30913,
    postalCodePrefix: '930'
  },
  {
    id: 'rivers',
    name: 'Rivers',
    capital: 'Port Harcourt',
    region: 'South South',
    zone: 'SS',
    lgas: [
      'Abua/Odual', 'Ahoada East', 'Ahoada West', 'Akuku-Toru', 'Andoni', 'Asari-Toru',
      'Bonny', 'Degema', 'Eleme', 'Emuoha', 'Etche', 'Gokana', 'Ikwerre', 'Khana', 'Obio/Akpor',
      'Ogba/Egbema/Ndoni', 'Ogu/Bolo', 'Okrika', 'Omuma', 'Opobo/Nkoro', 'Oyigbo', 'Port Harcourt', 'Tai'
    ],
    population: 7320000,
    area: 11077,
    postalCodePrefix: '500'
  },
  {
    id: 'sokoto',
    name: 'Sokoto',
    capital: 'Sokoto',
    region: 'North West',
    zone: 'NW',
    lgas: [
      'Binji', 'Bodinga', 'Dange Shuni', 'Gada', 'Goronyo', 'Gudu', 'Gwadabawa', 'Illela',
      'Isa', 'Kebbe', 'Kware', 'Rabah', 'Sabon Birni', 'Shagari', 'Silame', 'Sokoto North',
      'Sokoto South', 'Tambuwal', 'Tangaza', 'Tureta', 'Wamako', 'Wurno', 'Yabo'
    ],
    population: 4996400,
    area: 25973,
    postalCodePrefix: '840'
  },
  {
    id: 'taraba',
    name: 'Taraba',
    capital: 'Jalingo',
    region: 'North East',
    zone: 'NE',
    lgas: [
      'Ardo Kola', 'Bali', 'Donga', 'Gashaka', 'Gassol', 'Ibi', 'Jalingo', 'Karim Lamido',
      'Kumi', 'Lau', 'Sardauna', 'Takum', 'Ussa', 'Wukari', 'Yorro', 'Zing'
    ],
    population: 3068000,
    area: 54473,
    postalCodePrefix: '660'
  },
  {
    id: 'yobe',
    name: 'Yobe',
    capital: 'Damaturu',
    region: 'North East',
    zone: 'NE',
    lgas: [
      'Bade', 'Bursari', 'Damaturu', 'Fika', 'Fune', 'Geidam', 'Gujba', 'Gulani', 'Jakusko',
      'Karasuwa', 'Machina', 'Nangere', 'Nguru', 'Potiskum', 'Tarmuwa', 'Yunusari', 'Yusufari'
    ],
    population: 3294200,
    area: 45502,
    postalCodePrefix: '620'
  },
  {
    id: 'zamfara',
    name: 'Zamfara',
    capital: 'Gusau',
    region: 'North West',
    zone: 'NW',
    lgas: [
      'Anka', 'Bakura', 'Birnin Magaji/Kiyaw', 'Bukkuyum', 'Bungudu', 'Gummi', 'Gusau',
      'Kaura Namoda', 'Maradun', 'Maru', 'Shinkafi', 'Talata Mafara', 'Chafe', 'Zurmi'
    ],
    population: 4386800,
    area: 39762,
    postalCodePrefix: '860'
  },
  {
    id: 'fct',
    name: 'Federal Capital Territory',
    capital: 'Abuja',
    region: 'North Central',
    zone: 'NC',
    lgas: [
      'Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Municipal Area Council'
    ],
    population: 3564100,
    area: 7315,
    postalCodePrefix: '900'
  }
];

// Helper functions
export const getStateById = (id: string): NigerianState | undefined => {
  return NIGERIAN_STATES.find(state => state.id === id);
};

export const getStateByName = (name: string): NigerianState | undefined => {
  return NIGERIAN_STATES.find(state => 
    state.name.toLowerCase() === name.toLowerCase()
  );
};

export const getStatesByRegion = (region: string): NigerianState[] => {
  return NIGERIAN_STATES.filter(state => 
    state.region.toLowerCase() === region.toLowerCase()
  );
};

export const getStatesByZone = (zone: string): NigerianState[] => {
  return NIGERIAN_STATES.filter(state => 
    state.zone.toLowerCase() === zone.toLowerCase()
  );
};

export const getLGAsByState = (stateId: string): string[] => {
  const state = getStateById(stateId);
  return state ? state.lgas : [];
};

export const isValidLGA = (stateId: string, lga: string): boolean => {
  const state = getStateById(stateId);
  return state ? state.lgas.includes(lga) : false;
};

// Major cities in Nigeria (for autocomplete)
export const MAJOR_CITIES = [
  'Lagos', 'Kano', 'Ibadan', 'Abuja', 'Port Harcourt', 'Benin City', 'Maiduguri',
  'Zaria', 'Aba', 'Jos', 'Ilorin', 'Oyo', 'Enugu', 'Abeokuta', 'Onitsha', 'Warri',
  'Kaduna', 'Oshogbo', 'Calabar', 'Akure', 'Sokoto', 'Katsina', 'Ado Ekiti', 'Bauchi',
  'Ife', 'Ilesa', 'Minna', 'Owerri', 'Yola', 'Uyo', 'Birnin Kebbi', 'Gombe', 'Makurdi',
  'Lafia', 'Yenagoa', 'Umuahia', 'Awka', 'Damaturu', 'Jalingo', 'Gusau', 'Dutse'
];

// Nigerian regions with states
export const NIGERIAN_REGIONS = {
  'North West': ['Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara'],
  'North East': ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'],
  'North Central': ['Benue', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau', 'Federal Capital Territory'],
  'South West': ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo'],
  'South East': ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'],
  'South South': ['Akwa Ibom', 'Bayelsa', 'Cross River', 'Delta', 'Edo', 'Rivers']
};

export type NigerianStateType = typeof NIGERIAN_STATES[0];
export type NigerianRegion = keyof typeof NIGERIAN_REGIONS;