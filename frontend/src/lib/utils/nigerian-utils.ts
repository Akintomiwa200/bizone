export interface NigerianState {
  code: string;
  name: string;
  capital: string;
  region: string;
}

export const NIGERIAN_STATES: NigerianState[] = [
  { code: 'AB', name: 'Abia', capital: 'Umuahia', region: 'South East' },
  { code: 'AD', name: 'Adamawa', capital: 'Yola', region: 'North East' },
  { code: 'AK', name: 'Akwa Ibom', capital: 'Uyo', region: 'South South' },
  { code: 'AN', name: 'Anambra', capital: 'Awka', region: 'South East' },
  { code: 'BA', name: 'Bauchi', capital: 'Bauchi', region: 'North East' },
  { code: 'BY', name: 'Bayelsa', capital: 'Yenagoa', region: 'South South' },
  { code: 'BE', name: 'Benue', capital: 'Makurdi', region: 'North Central' },
  { code: 'BO', name: 'Borno', capital: 'Maiduguri', region: 'North East' },
  { code: 'CR', name: 'Cross River', capital: 'Calabar', region: 'South South' },
  { code: 'DE', name: 'Delta', capital: 'Asaba', region: 'South South' },
  { code: 'EB', name: 'Ebonyi', capital: 'Abakaliki', region: 'South East' },
  { code: 'ED', name: 'Edo', capital: 'Benin City', region: 'South South' },
  { code: 'EK', name: 'Ekiti', capital: 'Ado-Ekiti', region: 'South West' },
  { code: 'EN', name: 'Enugu', capital: 'Enugu', region: 'South East' },
  { code: 'FC', name: 'Federal Capital Territory', capital: 'Abuja', region: 'North Central' },
  { code: 'GO', name: 'Gombe', capital: 'Gombe', region: 'North East' },
  { code: 'IM', name: 'Imo', capital: 'Owerri', region: 'South East' },
  { code: 'JI', name: 'Jigawa', capital: 'Dutse', region: 'North West' },
  { code: 'KD', name: 'Kaduna', capital: 'Kaduna', region: 'North West' },
  { code: 'KN', name: 'Kano', capital: 'Kano', region: 'North West' },
  { code: 'KT', name: 'Katsina', capital: 'Katsina', region: 'North West' },
  { code: 'KE', name: 'Kebbi', capital: 'Birnin Kebbi', region: 'North West' },
  { code: 'KO', name: 'Kogi', capital: 'Lokoja', region: 'North Central' },
  { code: 'KW', name: 'Kwara', capital: 'Ilorin', region: 'North Central' },
  { code: 'LA', name: 'Lagos', capital: 'Ikeja', region: 'South West' },
  { code: 'NA', name: 'Nasarawa', capital: 'Lafia', region: 'North Central' },
  { code: 'NI', name: 'Niger', capital: 'Minna', region: 'North Central' },
  { code: 'OG', name: 'Ogun', capital: 'Abeokuta', region: 'South West' },
  { code: 'ON', name: 'Ondo', capital: 'Akure', region: 'South West' },
  { code: 'OS', name: 'Osun', capital: 'Oshogbo', region: 'South West' },
  { code: 'OY', name: 'Oyo', capital: 'Ibadan', region: 'South West' },
  { code: 'PL', name: 'Plateau', capital: 'Jos', region: 'North Central' },
  { code: 'RI', name: 'Rivers', capital: 'Port Harcourt', region: 'South South' },
  { code: 'SO', name: 'Sokoto', capital: 'Sokoto', region: 'North West' },
  { code: 'TA', name: 'Taraba', capital: 'Jalingo', region: 'North East' },
  { code: 'YO', name: 'Yobe', capital: 'Damaturu', region: 'North East' },
  { code: 'ZA', name: 'Zamfara', capital: 'Gusau', region: 'North West' },
];

export function getStateByCode(code: string): NigerianState | undefined {
  return NIGERIAN_STATES.find(state => state.code === code);
}

export function getStatesByRegion(region: string): NigerianState[] {
  return NIGERIAN_STATES.filter(state => state.region === region);
}

export function formatNigerianAddress(address: {
  street: string;
  city: string;
  state: string;
  postalCode?: string;
}): string {
  const parts = [address.street, address.city, address.state, address.postalCode];
  return parts.filter(part => part && part.trim()).join(', ');
}

export function isLagosState(stateCode: string): boolean {
  return stateCode === 'LA';
}

export function getLGAForState(stateCode: string): string[] {
  // Simplified LGA list - in practice, you'd want a complete dataset
  const lgaMap: { [key: string]: string[] } = {
    'LA': ['Agege', 'Alimosho', 'Surulere', 'Ikeja', 'Lagos Island', 'Lagos Mainland', 'etc.'],
    'AB': ['Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North', 'etc.'],
    // Add other states as needed
  };
  return lgaMap[stateCode] || [];
}

export function validateNigerianPostalCode(postalCode: string): boolean {
  return /^\d{6}$/.test(postalCode);
}