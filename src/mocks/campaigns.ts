export interface Campaign {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
}

export const campaigns: Campaign[] = [
  {
    id: 1,
    title: 'Clean Water Project',
    description: 'Help bring clean water to villages.',
    category: 'Water',
    image: 'https://plus.unsplash.com/premium_photo-1678837556048-8809e355241b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=300',
    price: 1000,
  },
  {
    id: 2,
    title: 'Tree Planting',
    description: 'Support reforestation efforts worldwide.',
    category: 'Environment',
    image: 'https://plus.unsplash.com/premium_photo-1681140560806-928e8b9a9a20?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=300',
    price: 50,
  },
  {
    id: 3,
    title: 'Education for Children',
    description: 'Support education programs for underprivileged children.',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=300',
    price: 250,
  },
  {
    id: 4,
    title: 'Food for Families',
    description: 'Provide meals for families in need.',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=300',
    price: 100,
  },
  {
    id: 5,
    title: 'Healthcare Access',
    description: 'Support medical services in underserved communities.',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=300',
    price: 500,
  },
  {
    id: 6,
    title: 'Disaster Relief',
    description: 'Provide emergency aid to disaster-affected areas.',
    category: 'Emergency',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=300',
    price: 750,
  },
];
