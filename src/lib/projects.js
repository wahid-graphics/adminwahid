// Simple file-based project store using environment-safe JSON
// On Vercel: projects are stored in-memory per function instance
// For persistence: connect a database (Supabase, PlanetScale, etc.)

let projectsCache = null

function getDefaultProjects() {
  return [
    { id: '1', title: 'Outdoor Flex Banner', category: 'flex', image: '/images/flex-1.jpg', description: 'Large format outdoor flex printing with UV-resistant inks', featured: true, order: 1, createdAt: '2025-01-01' },
    { id: '2', title: 'Doctor Standy Flex', category: 'flex', image: '/images/flex-2.jpg', description: 'Medical clinic standy flex design and print', featured: false, order: 2, createdAt: '2025-01-02' },
    { id: '3', title: 'Shop Display Flex', category: 'flex', image: '/images/flex-3.jpg', description: 'Retail shop display flex banner', featured: true, order: 3, createdAt: '2025-01-03' },
    { id: '4', title: 'Saloon Flex Banner', category: 'flex', image: '/images/flex-4.jpg', description: 'Beauty saloon promotional flex banner', featured: false, order: 4, createdAt: '2025-01-04' },
    { id: '5', title: 'Business Card Design', category: 'bcard', image: '/images/bcard-1.jpg', description: 'Professional business card with premium finish', featured: true, order: 5, createdAt: '2025-01-05' },
    { id: '6', title: 'Al Noor Dairy Form', category: 'bcard', image: '/images/bcard-2.jpg', description: 'Dairy farm business card and form design', featured: false, order: 6, createdAt: '2025-01-06' },
    { id: '7', title: 'Dubai Business Card', category: 'bcard', image: '/images/bcard-3.jpg', description: 'Luxury visiting card for Dubai-based client', featured: true, order: 7, createdAt: '2025-01-07' },
    { id: '8', title: 'Umar Card', category: 'bcard', image: '/images/bcard-4.jpg', description: 'Custom business card with unique layout', featured: false, order: 8, createdAt: '2025-01-08' },
    { id: '9', title: 'Qadrat Ulla Card', category: 'bcard', image: '/images/bcard-5.jpg', description: 'Professional visiting card design', featured: false, order: 9, createdAt: '2025-01-09' },
    { id: '10', title: 'Logo Collection', category: 'logo', image: '/images/logo-port-1.jpg', description: 'Multiple logo designs for various clients', featured: true, order: 10, createdAt: '2025-01-10' },
    { id: '11', title: 'Dairy Farm Logo', category: 'logo', image: '/images/logo-port-2.jpg', description: 'Brand identity for dairy farm business', featured: true, order: 11, createdAt: '2025-01-11' },
    { id: '12', title: 'Dua Palar Logo', category: 'logo', image: '/images/logo-port-3.jpg', description: 'Logo design for Dua Palar brand', featured: false, order: 12, createdAt: '2025-01-12' },
    { id: '13', title: 'Knowledge School Logo', category: 'logo', image: '/images/logo-port-4.jpg', description: 'Educational institution logo design', featured: true, order: 13, createdAt: '2025-01-13' },
    { id: '14', title: 'SGS Logo', category: 'logo', image: '/images/logo-port-5.jpg', description: 'Corporate logo design for SGS company', featured: false, order: 14, createdAt: '2025-01-14' },
    { id: '15', title: 'Travel & Tour Logo', category: 'logo', image: '/images/logo-port-6.jpg', description: 'Travel company brand identity', featured: false, order: 15, createdAt: '2025-01-15' },
    { id: '16', title: 'Food Menu 4-Colour', category: 'print4', image: '/images/print4-1.jpg', description: 'Full-colour restaurant menu design and print', featured: true, order: 16, createdAt: '2025-01-16' },
    { id: '17', title: 'Food Menu Design 2', category: 'print4', image: '/images/print4-2.jpg', description: 'Colourful food menu with custom layout', featured: false, order: 17, createdAt: '2025-01-17' },
    { id: '18', title: 'Soap Box Packaging', category: 'print4', image: '/images/print4-3.jpg', description: '4-colour soap box packaging design', featured: true, order: 18, createdAt: '2025-01-18' },
    { id: '19', title: 'School File Cover', category: 'print4', image: '/images/print4-4.jpg', description: 'Colourful school file cover design', featured: false, order: 19, createdAt: '2025-01-19' },
    { id: '20', title: 'Dabbey 4-Colour', category: 'print4', image: '/images/print4-5.jpg', description: 'Product packaging 4-colour print', featured: false, order: 20, createdAt: '2025-01-20' },
    { id: '21', title: 'Sobhai Traders', category: 'print4', image: '/images/print4-6.jpg', description: 'Business brochure full-colour print', featured: false, order: 21, createdAt: '2025-01-21' },
    { id: '22', title: 'Shadi Card Design 1', category: 'shadi', image: '/images/shadi-1.jpg', description: 'Elegant wedding invitation card', featured: true, order: 22, createdAt: '2025-01-22' },
    { id: '23', title: 'Shadi Card Design 2', category: 'shadi', image: '/images/shadi-2.jpg', description: 'Premium wedding card with gold border', featured: true, order: 23, createdAt: '2025-01-23' },
    { id: '24', title: 'Shadi Card Design 3', category: 'shadi', image: '/images/shadi-3.jpg', description: 'Traditional wedding invitation design', featured: false, order: 24, createdAt: '2025-01-24' },
    { id: '25', title: 'Wedding Invitation', category: 'shadi', image: '/images/shadi-4.jpg', description: 'Custom wedding invitation card design', featured: false, order: 25, createdAt: '2025-01-25' },
    { id: '26', title: 'DR Pamphlet', category: 'other', image: '/images/one1.jpg', description: 'Doctor promotional pamphlet design', featured: false, order: 26, createdAt: '2025-01-26' },
    { id: '27', title: 'Joia Showroom', category: 'other', image: '/images/one2.jpg', description: 'Showroom one-colour promotional material', featured: false, order: 27, createdAt: '2025-01-27' },
    { id: '28', title: 'One Colour Pamphlet', category: 'other', image: '/images/one3.jpg', description: 'Single colour pamphlet for marketing', featured: false, order: 28, createdAt: '2025-01-28' },
    { id: '29', title: 'Islamic Event Post', category: 'other', image: '/images/islamic-1.jpg', description: 'Islamic event promotional poster', featured: true, order: 29, createdAt: '2025-01-29' },
    { id: '30', title: 'Masjid Umar Farooq', category: 'other', image: '/images/islamic-2.jpg', description: 'Masjid event poster design', featured: false, order: 30, createdAt: '2025-01-30' },
    { id: '31', title: 'Zikar Karbala', category: 'other', image: '/images/islamic-3.jpg', description: 'Religious occasion event poster', featured: false, order: 31, createdAt: '2025-01-31' },
  ]
}

export function getProjects() {
  if (!projectsCache) {
    projectsCache = getDefaultProjects()
  }
  return projectsCache
}

export function addProject(project) {
  const projects = getProjects()
  const newProject = {
    ...project,
    id: Date.now().toString(),
    order: projects.length + 1,
    createdAt: new Date().toISOString().split('T')[0],
  }
  projectsCache = [...projects, newProject]
  return newProject
}

export function updateProject(id, updates) {
  const projects = getProjects()
  projectsCache = projects.map(p => p.id === id ? { ...p, ...updates } : p)
  return projectsCache.find(p => p.id === id)
}

export function deleteProject(id) {
  const projects = getProjects()
  projectsCache = projects.filter(p => p.id !== id)
  return true
}

export const CATEGORIES = {
  flex:   { label: 'Flex Banners',      urdu: 'فلیکس بینر' },
  bcard:  { label: 'Visiting Cards',    urdu: 'وزٹنگ کارڈ' },
  logo:   { label: 'Logo Design',       urdu: 'لوگو ڈیزائن' },
  shadi:  { label: 'Shadi Cards',       urdu: 'شادی کارڈ' },
  print4: { label: '4-Colour Printing', urdu: 'فور کلر پرنٹنگ' },
  other:  { label: 'Other Works',       urdu: 'دیگر کام' },
}
