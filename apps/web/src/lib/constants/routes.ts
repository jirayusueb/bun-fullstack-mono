export const routes = {
  home: '/',
  about: '/about',
  contact: '/contact',
  products: '/products',
  product: (id: string) => `/products/${id}`,
  categories: '/categories',
  category: (id: string) => `/categories/${id}`,
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
};
