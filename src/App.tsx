import { useState, useMemo, useEffect } from 'react';
import {
  ChefHat,
  GraduationCap,
  Briefcase,
  Building2,
  Bell,
  CheckCircle2,
  Award,
  Search,
  Filter,
  Plus,
  UserCheck,
  FileText,
  Clock,
  MapPin,
  DollarSign,
  Sparkles,
  ArrowRight,
  LogOut,
  Users,
  ShieldCheck,
  Edit3,
  X,
  Check,
  BookOpen,
  Utensils,
  TrendingUp,
  Send,
  Eye,
  Menu,
  AlertCircle,
  RefreshCw,
  Star,
  Calendar,
  Layers
} from 'lucide-react';

// ============================================================================
// DATOS INICIALES DEL ECOSISTEMA (SEMILLA REALISTA SEGÚN DOCUMENTO)
// ============================================================================

const INITIAL_COURSES = [
  {
    id: 'c1',
    title: 'Manipulación Higiénica de Alimentos y BPM',
    institution: 'SENA - Centro de Comercio y Servicios',
    institutionType: 'Institución Pública',
    area: 'Manipulación de alimentos',
    duration: '40 horas',
    modality: 'Presencial / Práctico',
    schedule: 'Lunes a Viernes 8:00 AM - 12:00 PM',
    description: 'Normatividad sanitaria vigente, buenas prácticas de manufactura, control de temperaturas y prevención de contaminación cruzada en cocinas profesionales.',
    skillsGranted: ['Manipulación de alimentos', 'Normativa BPM', 'Higiene en cocina'],
    spots: 12,
    status: 'Activo'
  },
  {
    id: 'c2',
    title: 'Auxiliar de Cocina Básica y Cortes Profesionales',
    institution: 'SENA - Escuela Gastronómica',
    institutionType: 'Institución Pública',
    area: 'Cocina',
    duration: '120 horas',
    modality: 'Presencial',
    schedule: 'Martes a Sábado 2:00 PM - 6:00 PM',
    description: 'Técnicas fundamentales de corte, fondos, salsas madre, mise en place, cocción y apoyo operativo en línea caliente y fría.',
    skillsGranted: ['Auxiliar de cocina', 'Mise en place', 'Cortes culinarios'],
    spots: 8,
    status: 'Activo'
  },
  {
    id: 'c3',
    title: 'Barismo Profesional y Preparación de Bebidas de Café',
    institution: 'ONG Cocina con Propósito',
    institutionType: 'ONG Aliada',
    area: 'Barismo',
    duration: '60 horas',
    modality: 'Presencial',
    schedule: 'Lunes, Miércoles y Viernes 9:00 AM - 1:00 PM',
    description: 'Calibración de molino, extracción de espresso, texturización de leche, arte latte básico y métodos de filtrado especiales.',
    skillsGranted: ['Barismo', 'Extracción Espresso', 'Arte Latte'],
    spots: 10,
    status: 'Activo'
  },
  {
    id: 'c4',
    title: 'Servicio a la Mesa, Protocolo y Atención al Comensal',
    institution: 'Alcaldía Municipal - Ruta de Inclusión',
    institutionType: 'Alcaldía',
    area: 'Servicio',
    duration: '50 horas',
    modality: 'Híbrido',
    schedule: 'Sábados 8:00 AM - 4:00 PM',
    description: 'Etiqueta en el servicio gastronómico, manejo de comandas, maridaje básico, resolución de quejas y experiencia de cliente en restaurantes y hoteles.',
    skillsGranted: ['Mesero', 'Atención al cliente', 'Manejo de comandas'],
    spots: 15,
    status: 'Activo'
  },
  {
    id: 'c5',
    title: 'Panadería Artesanal y Pastelería de Vitrina',
    institution: 'SENA - Centro Agroindustrial',
    institutionType: 'Institución Pública',
    area: 'Cocina',
    duration: '80 horas',
    modality: 'Presencial',
    schedule: 'Lunes a Jueves 1:00 PM - 5:00 PM',
    description: 'Formulación panadera, amasado, fermentación controlada, horneo y repostería básica para cafeterías y hoteles.',
    skillsGranted: ['Panadería básica', 'Pastelería', 'Control de horneo'],
    spots: 6,
    status: 'Activo'
  }
];

const INITIAL_CANDIDATES = [
  {
    id: 'cand1',
    name: 'Carlos Andrés Mendoza',
    email: 'carlos.mendoza@correo.com',
    phone: '+57 312 456 7890',
    location: 'Zona Centro / Norte',
    availability: 'Tiempo completo',
    summary: 'Persona resiliente y comprometida con formación certificada en manipulación de alimentos y cocina básica. Alta capacidad de trabajo bajo presión en horas pico.',
    experience: [
      {
        id: 'exp1',
        role: 'Ayudante de cocina y producción',
        place: 'Comedor Comunitario El Encuentro',
        period: '2025 - 2026 (8 meses)',
        details: 'Apoyo en alistamiento de vegetales, limpieza de estación y emplatado de 120 almuerzos diarios.'
      }
    ],
    skills: [
      { name: 'Manipulación de alimentos', verified: true, issuer: 'SENA' },
      { name: 'Auxiliar de cocina', verified: true, issuer: 'SENA' },
      { name: 'Mise en place', verified: true, issuer: 'SENA' },
      { name: 'Trabajo en equipo', verified: false, issuer: 'Autodeclarada' }
    ],
    certifications: [
      {
        id: 'cert-init-1',
        courseTitle: 'Manipulación Higiénica de Alimentos y BPM',
        issuer: 'SENA - Centro de Comercio y Servicios',
        date: '2026-08-15',
        code: 'SENA-BPM-8841'
      },
      {
        id: 'cert-init-2',
        courseTitle: 'Auxiliar de Cocina Básica y Cortes Profesionales',
        issuer: 'SENA - Escuela Gastronómica',
        date: '2026-10-02',
        code: 'SENA-COC-9120'
      }
    ]
  },
  {
    id: 'cand2',
    name: 'María Fernanda Rentería',
    email: 'maria.renteria@correo.com',
    phone: '+57 320 987 6543',
    location: 'Zona Turística / Sur',
    availability: 'Turnos rotativos / Fines de semana',
    summary: 'Apasionada por el café de especialidad y el servicio hospitalario. Certificada en barismo y atención a la mesa con excelente presentación y carisma.',
    experience: [
      {
        id: 'exp2',
        role: 'Auxiliar de cafetería',
        place: 'Café del Parque',
        period: '2025 (6 meses)',
        details: 'Preparación de bebidas calientes, atención en barra y manejo de caja registradora.'
      }
    ],
    skills: [
      { name: 'Barismo', verified: true, issuer: 'ONG Cocina con Propósito' },
      { name: 'Mesero', verified: true, issuer: 'Alcaldía Municipal' },
      { name: 'Atención al cliente', verified: true, issuer: 'Alcaldía Municipal' }
    ],
    certifications: [
      {
        id: 'cert-init-3',
        courseTitle: 'Barismo Profesional y Preparación de Bebidas de Café',
        issuer: 'ONG Cocina con Propósito',
        date: '2026-09-10',
        code: 'ONG-BAR-3012'
      }
    ]
  },
  {
    id: 'cand3',
    name: 'Jorge Luis Palomino',
    email: 'jorge.palomino@correo.com',
    phone: '+57 315 234 1122',
    location: 'Zona Occidental',
    availability: 'Tiempo completo',
    summary: 'Trabajador dedicado con experiencia en logística de eventos, montaje de salones y apoyo en cocina fría para servicios de catering.',
    experience: [
      {
        id: 'exp3',
        role: 'Logística y apoyo de salón',
        place: 'Eventos y Banquetes La Colina',
        period: '2024 - 2025 (1 año)',
        details: 'Montaje de mesas, servicio en eventos sociales y apoyo en inventario de menaje.'
      }
    ],
    skills: [
      { name: 'Mesero', verified: true, issuer: 'Alcaldía Municipal' },
      { name: 'Manipulación de alimentos', verified: true, issuer: 'SENA' },
      { name: 'Logística de eventos', verified: false, issuer: 'Autodeclarada' }
    ],
    certifications: [
      {
        id: 'cert-init-4',
        courseTitle: 'Servicio a la Mesa, Protocolo y Atención al Comensal',
        issuer: 'Alcaldía Municipal - Ruta de Inclusión',
        date: '2026-07-22',
        code: 'ALC-SRV-4410'
      }
    ]
  }
];

const INITIAL_JOBS = [
  {
    id: 'j1',
    title: 'Auxiliar de Cocina - Línea Caliente',
    company: 'Restaurante Sabores de Origen',
    businessType: 'Restaurante',
    location: 'Zona Gastronómica Centro',
    salary: '$1.450.000 + Propinas + Prestaciones',
    contractType: 'Término Fijo (Formal)',
    schedule: 'Martes a Domingo (Turnos partidos)',
    area: 'Cocina',
    requiredSkills: ['Auxiliar de cocina', 'Manipulación de alimentos', 'Mise en place'],
    description: 'Buscamos auxiliar de cocina con formación técnica certificada para apoyar producción diaria, mise en place y despacho en cocina tradicional contemporánea.',
    status: 'Activa',
    createdAt: 'Hace 2 días'
  },
  {
    id: 'j2',
    title: 'Barista de Barra Principal',
    company: 'Tostaduría & Café Mirador',
    businessType: 'Cafetería de Especialidad',
    location: 'Sector Turístico Norte',
    salary: '$1.500.000 + Bonificaciones',
    contractType: 'Indefinido (Formal)',
    schedule: 'Lunes a Sábado 7:00 AM - 3:30 PM',
    area: 'Barismo',
    requiredSkills: ['Barismo', 'Atención al cliente'],
    description: 'Se requiere barista certificado con conocimientos en calibración de espresso, métodos filtrados y excelente trato al turista nacional y extranjero.',
    status: 'Activa',
    createdAt: 'Hace 1 día'
  },
  {
    id: 'j3',
    title: 'Mesero / Anfitrión de Salón',
    company: 'Hotel Boutique Palma Real',
    businessType: 'Hotel',
    location: 'Avenida Principal',
    salary: '$1.423.500 + Recargos + Alimentación',
    contractType: 'Término Fijo (Formal)',
    schedule: 'Turnos rotativos',
    area: 'Servicio',
    requiredSkills: ['Mesero', 'Atención al cliente', 'Manipulación de alimentos'],
    description: 'Hotel boutique busca mesero/a con protocolo de servicio a la mesa para restaurante interno y atención de eventos corporativos.',
    status: 'Activa',
    createdAt: 'Hoy'
  }
];

const INITIAL_APPLICATIONS = [
  {
    id: 'app1',
    jobId: 'j1',
    candidateId: 'cand1',
    status: 'En revisión',
    appliedAt: '2026-11-19',
    note: 'Perfil con doble certificación SENA en Cocina y BPM.'
  },
  {
    id: 'app2',
    jobId: 'j2',
    candidateId: 'cand2',
    status: 'Entrevistado',
    appliedAt: '2026-11-18',
    note: 'Prueba técnica de espresso programada con éxito.'
  }
];

const INITIAL_ENROLLMENTS = [
  {
    id: 'enr1',
    courseId: 'c3',
    candidateId: 'cand1',
    status: 'Pendiente de certificación',
    enrolledAt: '2026-11-01'
  },
  {
    id: 'enr2',
    courseId: 'c4',
    candidateId: 'cand1',
    status: 'En curso',
    enrolledAt: '2026-11-15'
  },
  {
    id: 'enr3',
    courseId: 'c1',
    candidateId: 'cand2',
    status: 'Pendiente de certificación',
    enrolledAt: '2026-11-05'
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    targetRole: 'candidate',
    title: 'Actualización de postulación',
    message: 'Restaurante Sabores de Origen cambió el estado de tu postulación a "En revisión".',
    type: 'status',
    time: 'Hace 2 horas',
    read: false
  },
  {
    id: 'n2',
    targetRole: 'candidate',
    title: 'Nuevo curso gratuito disponible',
    message: 'SENA ha publicado "Panadería Artesanal y Pastelería de Vitrina" con cupos abiertos.',
    type: 'course',
    time: 'Ayer',
    read: false
  },
  {
    id: 'n3',
    targetRole: 'employer',
    title: 'Nuevo candidato verificado postulado',
    message: 'Carlos Andrés Mendoza (Certificado SENA) aplicó a "Auxiliar de Cocina - Línea Caliente".',
    type: 'application',
    time: 'Hace 2 días',
    read: false
  },
  {
    id: 'n4',
    targetRole: 'institution',
    title: 'Solicitud de certificación pendiente',
    message: 'Carlos Andrés Mendoza completó el módulo práctico de "Barismo Profesional" y espera validación.',
    type: 'cert',
    time: 'Hace 3 horas',
    read: false
  }
];

// ============================================================================
// COMPONENTE PRINCIPAL DE LA APLICACIÓN
// ============================================================================

export default function App() {
  // Estado de Autenticación y Rol Activo
  // null = Pantalla de Inicio / Login / Registro
  const [currentRole, setCurrentRole] = useState<'candidate' | 'employer' | 'institution' | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estados de Datos del Ecosistema (Compartidos y Reactivos)
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [activeCandidateId, setActiveCandidateId] = useState('cand1');
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [enrollments, setEnrollments] = useState(INITIAL_ENROLLMENTS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Estado de Perfil Empleador e Institución
  const [employerProfile, setEmployerProfile] = useState({
    name: 'Restaurante Sabores de Origen',
    contactName: 'Laura Gómez (Jefe de Talento Humano)',
    type: 'Restaurante & Catering',
    location: 'Zona Gastronómica Centro'
  });

  const [institutionProfile, setInstitutionProfile] = useState({
    name: 'SENA - Centro de Comercio y Servicios',
    coordinator: 'Coord. Formación para el Trabajo',
    type: 'Institución Pública / Aliado Formador'
  });

  // Sistema de Notificaciones Toast Emergentes
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; message: string; type: string }>>([]);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);

  // Modales globales
  const [selectedCandidateModal, setSelectedCandidateModal] = useState<(typeof INITIAL_CANDIDATES)[number] | null>(null);

  const activeCandidate = useMemo(
    () => candidates.find((c) => c.id === activeCandidateId) || candidates[0],
    [candidates, activeCandidateId]
  );

  // Función centralizada para crear notificaciones integradas y toast
  const pushNotification = ({ targetRole, title, message, type = 'info' }) => {
    const newNotif = {
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      targetRole,
      title,
      message,
      type,
      time: 'Ahora mismo',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);

    const toastId = newNotif.id;
    setToasts((prev) => [...prev, { id: toastId, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 4500);
  };

  // Filtrar notificaciones según el rol actual
  const roleNotifications = useMemo(
    () => notifications.filter((n) => n.targetRole === currentRole || n.targetRole === 'all'),
    [notifications, currentRole]
  );

  const unreadCount = useMemo(
    () => roleNotifications.filter((n) => !n.read).length,
    [roleNotifications]
  );

  const markAllNotificationsRead = () => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.targetRole === currentRole || n.targetRole === 'all' ? { ...n, read: true } : n
      )
    );
  };

  // Manejo de Inicio de Sesión / Cambio de Rol
  const handleLoginAs = (role: 'candidate' | 'employer' | 'institution', customUserData: any = null) => {
    if (customUserData) {
      if (role === 'candidate') {
        const newCand = {
          id: `cand-${Date.now()}`,
          name: customUserData.name,
          email: customUserData.email,
          phone: customUserData.phone || '+57 300 000 0000',
          location: customUserData.location || 'Centro Urbano',
          availability: 'Tiempo completo',
          summary: 'Nuevo talento gastronómico registrado en la ruta de inclusión laboral.',
          experience: [],
          skills: [
            { name: 'Disposición y servicio', verified: false, issuer: 'Autodeclarada' }
          ],
          certifications: []
        };
        setCandidates((prev) => [newCand, ...prev]);
        setActiveCandidateId(newCand.id);
      } else if (role === 'employer') {
        setEmployerProfile({
          name: customUserData.organization || customUserData.name,
          contactName: customUserData.name,
          type: 'Establecimiento Gastronómico',
          location: customUserData.location || 'Zona Gastronómica'
        });
      } else if (role === 'institution') {
        setInstitutionProfile({
          name: customUserData.organization || customUserData.name,
          coordinator: customUserData.name,
          type: 'Institución Formadora / ONG'
        });
      }
    }

    setCurrentRole(role);
    setActiveTab('dashboard');
    setMobileMenuOpen(false);
  };

  // ==========================================================================
  // ACCIONES DE NEGOCIO CONECTADAS ENTRE LOS 3 ROLES
  // ==========================================================================

  // 1. Candidato se inscribe a un curso gratuito
  const handleEnrollCourse = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    const alreadyEnrolled = enrollments.some(
      (e) => e.courseId === courseId && e.candidateId === activeCandidate.id
    );
    if (alreadyEnrolled) return;

    const newEnrollment = {
      id: `enr-${Date.now()}`,
      courseId,
      candidateId: activeCandidate.id,
      status: 'En curso',
      enrolledAt: new Date().toISOString().split('T')[0]
    };

    setEnrollments((prev) => [newEnrollment, ...prev]);
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId && c.spots > 0 ? { ...c, spots: c.spots - 1 } : c))
    );

    pushNotification({
      targetRole: 'candidate',
      title: 'Inscripción exitosa',
      message: `Te has inscrito al curso gratuito "${course.title}" (${course.institution}).`,
      type: 'course'
    });

    pushNotification({
      targetRole: 'institution',
      title: 'Nueva inscripción registrada',
      message: `${activeCandidate.name} se inscribió en "${course.title}".`,
      type: 'course'
    });
  };

  // 2. Candidato finaliza curso y solicita validación de competencia
  const handleCompleteCourseRequest = (enrollmentId) => {
    const enr = enrollments.find((e) => e.id === enrollmentId);
    if (!enr) return;
    const course = courses.find((c) => c.id === enr.courseId);

    setEnrollments((prev) =>
      prev.map((e) =>
        e.id === enrollmentId ? { ...e, status: 'Pendiente de certificación' } : e
      )
    );

    pushNotification({
      targetRole: 'institution',
      title: 'Nueva solicitud de certificación',
      message: `${activeCandidate.name} finalizó "${course?.title}" y requiere validación de competencias.`,
      type: 'cert'
    });

    pushNotification({
      targetRole: 'candidate',
      title: 'Curso finalizado - En validación',
      message: `Tu solicitud de certificado para "${course?.title}" fue enviada a ${course?.institution}.`,
      type: 'cert'
    });
  };

  // 3. Institución / Aliado certifica competencias en tiempo real -> Actualiza HV automáticamente
  const handleCertifyEnrollment = (enrollmentId) => {
    const enr = enrollments.find((e) => e.id === enrollmentId);
    if (!enr) return;
    const course = courses.find((c) => c.id === enr.courseId);
    const cand = candidates.find((c) => c.id === enr.candidateId);
    if (!course || !cand) return;

    // Actualizar inscripción a Certificado
    setEnrollments((prev) =>
      prev.map((e) => (e.id === enrollmentId ? { ...e, status: 'Certificado' } : e))
    );

    // Actualizar automáticamente la Hoja de Vida Dinámica del candidato
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== cand.id) return c;

        const existingSkillNames = new Set(c.skills.map((s) => s.name.toLowerCase()));
        const updatedSkills = [...c.skills];

        course.skillsGranted.forEach((skillName) => {
          const idx = updatedSkills.findIndex(
            (s) => s.name.toLowerCase() === skillName.toLowerCase()
          );
          if (idx >= 0) {
            updatedSkills[idx] = {
              ...updatedSkills[idx],
              verified: true,
              issuer: course.institution.split(' - ')[0]
            };
          } else if (!existingSkillNames.has(skillName.toLowerCase())) {
            updatedSkills.push({
              name: skillName,
              verified: true,
              issuer: course.institution.split(' - ')[0]
            });
          }
        });

        const newCert = {
          id: `cert-${Date.now()}`,
          courseTitle: course.title,
          issuer: course.institution,
          date: new Date().toISOString().split('T')[0],
          code: `CERT-${Math.floor(1000 + Math.random() * 9000)}`
        };

        return {
          ...c,
          skills: updatedSkills,
          certifications: [newCert, ...c.certifications]
        };
      })
    );

    pushNotification({
      targetRole: 'candidate',
      title: '¡Competencias Certificadas en Tiempo Real!',
      message: `${course.institution} validó tu curso "${course.title}". Tu Hoja de Vida Dinámica se actualizó automáticamente.`,
      type: 'cert'
    });
  };

  // 4. Candidato actualiza su Hoja de Vida Dinámica (datos, habilidades, experiencia)
  const handleUpdateCandidateProfile = (updatedFields) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === activeCandidate.id ? { ...c, ...updatedFields } : c))
    );
    pushNotification({
      targetRole: 'candidate',
      title: 'Hoja de Vida actualizada',
      message: 'Tus cambios ya son visibles para los empleadores del sector gastronómico.',
      type: 'info'
    });
  };

  // 5. Candidato se postula a una vacante formal
  const handleApplyToJob = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;

    const alreadyApplied = applications.some(
      (a) => a.jobId === jobId && a.candidateId === activeCandidate.id
    );
    if (alreadyApplied) return;

    const newApp = {
      id: `app-${Date.now()}`,
      jobId,
      candidateId: activeCandidate.id,
      status: 'En revisión',
      appliedAt: new Date().toISOString().split('T')[0],
      note: 'Postulación directa con perfil verificado.'
    };

    setApplications((prev) => [newApp, ...prev]);

    pushNotification({
      targetRole: 'candidate',
      title: 'Postulación enviada con éxito',
      message: `Tu Hoja de Vida Verificada fue enviada a ${job.company} para el cargo "${job.title}".`,
      type: 'application'
    });

    pushNotification({
      targetRole: 'employer',
      title: 'Nueva postulación recibida',
      message: `${activeCandidate.name} se postuló a tu vacante "${job.title}".`,
      type: 'application'
    });
  };

  // 6. Empleador crea o edita una vacante
  const handleSaveJob = (jobData, editingId = null) => {
    if (editingId) {
      setJobs((prev) => prev.map((j) => (j.id === editingId ? { ...j, ...jobData } : j)));
      pushNotification({
        targetRole: 'employer',
        title: 'Vacante actualizada',
        message: `Los requisitos de "${jobData.title}" han sido actualizados.`,
        type: 'info'
      });
    } else {
      const newJob = {
        ...jobData,
        id: `job-${Date.now()}`,
        company: employerProfile.name,
        businessType: employerProfile.type,
        status: 'Activa',
        createdAt: 'Hace un momento'
      };
      setJobs((prev) => [newJob, ...prev]);
      pushNotification({
        targetRole: 'candidate',
        title: 'Nueva vacante gastronómica disponible',
        message: `${employerProfile.name} busca "${newJob.title}" (${newJob.salary}).`,
        type: 'application'
      });
    }
  };

  // 7. Empleador cambia el estado de una vacante (Activa / Cerrada)
  const handleToggleJobStatus = (jobId) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, status: j.status === 'Activa' ? 'Cerrada' : 'Activa' } : j
      )
    );
  };

  // 8. Empleador actualiza estado de selección de un candidato
  const handleUpdateApplicationStatus = (applicationId, newStatus) => {
    const app = applications.find((a) => a.id === applicationId);
    if (!app) return;
    const job = jobs.find((j) => j.id === app.jobId);
    const cand = candidates.find((c) => c.id === app.candidateId);

    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status: newStatus } : a))
    );

    pushNotification({
      targetRole: 'candidate',
      title: `Actualización en tu proceso: ${newStatus}`,
      message: `${job?.company || 'El empleador'} actualizó tu postulación para "${job?.title}" al estado: ${newStatus}.`,
      type: 'status'
    });

    if (newStatus === 'Contratado') {
      pushNotification({
        targetRole: 'institution',
        title: '¡Inserción laboral efectiva lograda!',
        message: `El egresado certificado ${cand?.name} fue contratado formalmente por ${job?.company}.`,
        type: 'cert'
      });
    }
  };

  // 9. Institución publica un nuevo curso gratuito
  const handleCreateCourse = (courseData) => {
    const newCourse = {
      ...courseData,
      id: `course-${Date.now()}`,
      institution: institutionProfile.name,
      institutionType: institutionProfile.type,
      status: 'Activo'
    };
    setCourses((prev) => [newCourse, ...prev]);

    pushNotification({
      targetRole: 'candidate',
      title: 'Nuevo curso gratuito publicado',
      message: `${institutionProfile.name} abrió inscripciones para "${newCourse.title}" (${newCourse.area}).`,
      type: 'course'
    });
  };

  // ==========================================================================
  // RENDERIZADO: PANTALLA DE INICIO / REGISTRO / LOGIN (FUNCIONALIDAD 1)
  // ==========================================================================
  if (!currentRole) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <LandingAndAuthView
          onLoginAs={handleLoginAs}
          stats={{
            coursesCount: courses.length,
            candidatesCount: candidates.length,
            jobsCount: jobs.filter((j) => j.status === 'Activa').length
          }}
        />
      </div>
    );
  }

  // Configuración de navegación lateral según el rol activo
  const navItemsByRole = {
    candidate: [
      { id: 'dashboard', label: 'Inicio & Resumen', icon: Layers },
      { id: 'courses', label: 'Oferta Educativa Gratuita', icon: GraduationCap },
      { id: 'resume', label: 'Mi Hoja de Vida Dinámica', icon: FileText },
      { id: 'jobs', label: 'Buscar Vacantes', icon: Briefcase },
      { id: 'my-applications', label: 'Mis Postulaciones', icon: Send }
    ],
    employer: [
      { id: 'dashboard', label: 'Panel del Empleador', icon: Layers },
      { id: 'manage-jobs', label: 'Publicar y Gestionar Vacantes', icon: Briefcase },
      { id: 'search-candidates', label: 'Buscar Talento Verificado', icon: Search },
      { id: 'manage-applications', label: 'Gestión de Postulaciones', icon: UserCheck }
    ],
    institution: [
      { id: 'dashboard', label: 'Panel Institucional', icon: Layers },
      { id: 'validate-certs', label: 'Certificar Competencias', icon: Award },
      { id: 'manage-courses', label: 'Oferta Formativa Gratuita', icon: BookOpen }
    ]
  };

  const roleMeta = {
    candidate: {
      badge: 'Perfil Candidato (Población Desplazada)',
      userName: activeCandidate.name,
      color: 'bg-amber-600',
      lightBg: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    employer: {
      badge: 'Perfil Empleador Gastronómico',
      userName: employerProfile.name,
      color: 'bg-slate-900',
      lightBg: 'bg-slate-100 text-slate-800 border-slate-300'
    },
    institution: {
      badge: 'Institución Formadora / Aliado',
      userName: institutionProfile.name,
      color: 'bg-emerald-700',
      lightBg: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    }
  };

  const currentNav = navItemsByRole[currentRole] || [];
  const currentMeta = roleMeta[currentRole];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      {/* ==================================================================== */}
      {/* BARRA LATERAL (SIDEBAR DESKTOP + DRAWER MÓVIL)                        */}
      {/* ==================================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-slate-900 leading-none">
                GastroConecta
              </h1>
              <span className="text-[11px] font-medium text-slate-500">
                Intermediación e Inclusión
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tarjeta del Usuario Activo */}
        <div className="p-4 mx-3 mt-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <span
            className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border mb-1.5 ${currentMeta.lightBg}`}
          >
            {currentMeta.badge}
          </span>
          <p className="font-semibold text-sm text-slate-900 truncate">{currentMeta.userName}</p>
          {currentRole === 'candidate' && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>
                {activeCandidate.skills.filter((s) => s.verified).length} competencias verificadas
              </span>
            </div>
          )}
        </div>

        {/* Menú de Navegación */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Selector Rápido de Rol para Demostración del Ecosistema */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/70">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3" /> Cambiar vista de actor
          </p>
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            <button
              onClick={() => {
                setCurrentRole('candidate');
                setActiveTab('dashboard');
              }}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition ${
                currentRole === 'candidate'
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Candidato
            </button>
            <button
              onClick={() => {
                setCurrentRole('employer');
                setActiveTab('dashboard');
              }}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition ${
                currentRole === 'employer'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Empleador
            </button>
            <button
              onClick={() => {
                setCurrentRole('institution');
                setActiveTab('dashboard');
              }}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition ${
                currentRole === 'institution'
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Aliado
            </button>
          </div>
          <button
            onClick={() => setCurrentRole(null)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 bg-white transition"
          >
            <LogOut className="w-4 h-4" /> Cerrar Sesión / Inicio
          </button>
        </div>
      </aside>

      {/* Overlay móvil */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ==================================================================== */}
      {/* CONTENIDO PRINCIPAL                                                  */}
      {/* ==================================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Superior */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {currentNav.find((n) => n.id === activeTab)?.label || 'Panel Principal'}
              </h2>
              <p className="text-xs text-slate-500 hidden sm:block">
                Ecosistema centralizado de formación y empleabilidad gastronómica
              </p>
            </div>
          </div>

          {/* Botón de Notificaciones Integradas (Funcionalidad 8) */}
          <div className="flex items-center gap-3 relative">
            <button
              onClick={() => {
                setNotifDrawerOpen(!notifDrawerOpen);
                if (!notifDrawerOpen) markAllNotificationsRead();
              }}
              className="relative p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition flex items-center gap-2"
              aria-label="Notificaciones integradas"
            >
              <Bell className="w-5 h-5 text-amber-600" />
              <span className="hidden sm:inline text-xs font-semibold">Notificaciones</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center shadow">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Panel Desplegable de Notificaciones */}
            {notifDrawerOpen && (
              <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-600" />
                    <h3 className="font-bold text-sm text-slate-900">
                      Notificaciones Integradas
                    </h3>
                  </div>
                  <button
                    onClick={() => setNotifDrawerOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
                  {roleNotifications.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-500">
                      No tienes notificaciones recientes.
                    </div>
                  ) : (
                    roleNotifications.map((notif) => (
                      <div key={notif.id} className="p-3.5 hover:bg-slate-50 transition">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-slate-900">{notif.title}</p>
                          <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Área Dinámica de Vistas según Rol y Pestaña */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {/* ---------------- VISTAS DEL CANDIDATO ---------------- */}
          {currentRole === 'candidate' && (
            <>
              {activeTab === 'dashboard' && (
                <CandidateDashboard
                  candidate={activeCandidate}
                  courses={courses}
                  enrollments={enrollments.filter((e) => e.candidateId === activeCandidate.id)}
                  jobs={jobs.filter((j) => j.status === 'Activa')}
                  applications={applications.filter((a) => a.candidateId === activeCandidate.id)}
                  onNavigate={setActiveTab}
                  onCompleteCourse={handleCompleteCourseRequest}
                />
              )}
              {activeTab === 'courses' && (
                <CandidateCoursesView
                  courses={courses}
                  enrollments={enrollments.filter((e) => e.candidateId === activeCandidate.id)}
                  onEnroll={handleEnrollCourse}
                  onCompleteCourse={handleCompleteCourseRequest}
                />
              )}
              {activeTab === 'resume' && (
                <CandidateResumeView
                  candidate={activeCandidate}
                  onUpdateProfile={handleUpdateCandidateProfile}
                  onPreviewPublic={() => setSelectedCandidateModal(activeCandidate)}
                />
              )}
              {activeTab === 'jobs' && (
                <CandidateJobsView
                  candidate={activeCandidate}
                  jobs={jobs.filter((j) => j.status === 'Activa')}
                  applications={applications.filter((a) => a.candidateId === activeCandidate.id)}
                  onApply={handleApplyToJob}
                />
              )}
              {activeTab === 'my-applications' && (
                <CandidateApplicationsView
                  jobs={jobs}
                  applications={applications.filter((a) => a.candidateId === activeCandidate.id)}
                  onNavigate={setActiveTab}
                />
              )}
            </>
          )}

          {/* ---------------- VISTAS DEL EMPLEADOR ---------------- */}
          {currentRole === 'employer' && (
            <>
              {activeTab === 'dashboard' && (
                <EmployerDashboard
                  employer={employerProfile}
                  jobs={jobs}
                  candidates={candidates}
                  applications={applications}
                  onNavigate={setActiveTab}
                  onInspectCandidate={(cand) => setSelectedCandidateModal(cand)}
                />
              )}
              {activeTab === 'manage-jobs' && (
                <EmployerJobsView
                  jobs={jobs}
                  applications={applications}
                  onSaveJob={handleSaveJob}
                  onToggleStatus={handleToggleJobStatus}
                />
              )}
              {activeTab === 'search-candidates' && (
                <EmployerSearchCandidatesView
                  candidates={candidates}
                  onInspectCandidate={(cand) => setSelectedCandidateModal(cand)}
                  onSendInvite={(cand) =>
                    pushNotification({
                      targetRole: 'candidate',
                      title: 'Invitación directa de empleador',
                      message: `${employerProfile.name} revisó tu perfil verificado y te invita a postularte a sus vacantes.`,
                      type: 'application'
                    })
                  }
                />
              )}
              {activeTab === 'manage-applications' && (
                <EmployerApplicationsView
                  jobs={jobs}
                  candidates={candidates}
                  applications={applications}
                  onUpdateStatus={handleUpdateApplicationStatus}
                  onInspectCandidate={(cand) => setSelectedCandidateModal(cand)}
                />
              )}
            </>
          )}

          {/* ---------------- VISTAS DE INSTITUCIÓN / ALIADO ---------------- */}
          {currentRole === 'institution' && (
            <>
              {activeTab === 'dashboard' && (
                <InstitutionDashboard
                  institution={institutionProfile}
                  courses={courses}
                  enrollments={enrollments}
                  candidates={candidates}
                  applications={applications}
                  onNavigate={setActiveTab}
                  onCertify={handleCertifyEnrollment}
                />
              )}
              {activeTab === 'validate-certs' && (
                <InstitutionValidateCertsView
                  enrollments={enrollments}
                  courses={courses}
                  candidates={candidates}
                  onCertify={handleCertifyEnrollment}
                />
              )}
              {activeTab === 'manage-courses' && (
                <InstitutionCoursesView
                  courses={courses}
                  onCreateCourse={handleCreateCourse}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Modal de Hoja de Vida Verificada (Vista previa / Inspección de Empleador) */}
      {selectedCandidateModal && (
        <CandidateProfileModal
          candidate={selectedCandidateModal}
          onClose={() => setSelectedCandidateModal(null)}
        />
      )}

      {/* Contenedor de Notificaciones Toast Emergentes en Tiempo Real */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3 animate-fade-in"
          >
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-amber-400">{toast.title}</p>
              <p className="text-xs text-slate-200 mt-0.5 leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 1. PANTALLA DE INICIO, REGISTRO E INICIO DE SESIÓN DIFERENCIADO
// ============================================================================

function LandingAndAuthView({ onLoginAs, stats }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('candidate');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    location: '',
    password: ''
  });
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      setFormError('Por favor ingresa un correo electrónico válido.');
      return;
    }
    if (authMode === 'register' && !formData.name.trim()) {
      setFormError('Por favor ingresa tu nombre completo.');
      return;
    }
    setFormError('');

    if (authMode === 'register') {
      onLoginAs(selectedRole, formData);
    } else {
      onLoginAs(selectedRole);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Navbar superior */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                GastroConecta
              </span>
              <p className="text-xs text-slate-500">
                Intermediación Laboral Gastronómica e Inclusión Socioeconómica
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3.5 py-2 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>SENA • ONGs • Alcaldías • Sector Gastronómico</span>
          </div>
        </div>
      </header>

      {/* Hero + Acceso */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Columna Izquierda: Propuesta de Valor del Proyecto */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Plataforma Centralizada de Talento Gastronómico Verificado</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Conectamos la formación gratuita con el{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              empleo formal gastronómico
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Articulamos a las instituciones de capacitación (SENA, ONGs, Alcaldías), la población
            desplazada y los establecimientos gastronómicos en un solo lugar. Certifica tus
            habilidades en tiempo real y accede a vacantes formales sin intermediarios.
          </p>

          {/* Tarjetas de Acceso Rápido por Actor (Demo en 1 clic) */}
          <div className="pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Acceso directo al prototipo por perfil de usuario:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <button
                onClick={() => onLoginAs('candidate')}
                className="group text-left p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">Candidato</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Cursos gratuitos, HV dinámica y postulación a empleos.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                  Entrar ahora <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>

              <button
                onClick={() => onLoginAs('employer')}
                className="group text-left p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-900 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">Empleador</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Publicar vacantes, filtrar talento certificado y contratar.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-slate-900">
                  Entrar ahora <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>

              <button
                onClick={() => onLoginAs('institution')}
                className="group text-left p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-600 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">Institución / Aliado</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Cargar oferta educativa y certificar competencias.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                  Entrar ahora <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>

          {/* Indicadores del Ecosistema */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">{stats.coursesCount}</p>
              <p className="text-xs text-slate-500">Cursos gratuitos activos</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-emerald-600">{stats.candidatesCount}</p>
              <p className="text-xs text-slate-500">Perfiles certificados</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-amber-600">{stats.jobsCount}</p>
              <p className="text-xs text-slate-500">Vacantes formales abiertas</p>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Formulario de Registro / Inicio de Sesión */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8">
            <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setFormError('');
                }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${
                  authMode === 'login'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setFormError('');
                }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${
                  authMode === 'register'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Registrarse
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  1. Selecciona tu tipo de usuario
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'candidate', label: 'Candidato' },
                    { id: 'employer', label: 'Empleador' },
                    { id: 'institution', label: 'Aliado / ONG' }
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRole(r.id)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition ${
                        selectedRole === r.id
                          ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombre completo del responsable / candidato
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Andrea Martínez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              )}

              {authMode === 'register' && selectedRole !== 'candidate' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {selectedRole === 'employer'
                      ? 'Nombre del Restaurante / Hotel / Catering'
                      : 'Nombre de la Institución (SENA, ONG, Alcaldía)'}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      selectedRole === 'employer'
                        ? 'Ej. Restaurante La Cosecha'
                        : 'Ej. Fundación Gastronomía Social'
                    }
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  placeholder="usuario@correo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <span>
                  {authMode === 'login' ? 'Ingresar a la Plataforma' : 'Crear Cuenta y Entrar'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer académico */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500">
        Proyecto de Formulación: Articulación Laboral Gastronómica para Población Desplazada •
        Equipo: Andrés Felipe Galvis, Axel Dereck Gutierrez, Juan Diego Rojas y Manuela Vélez.
      </footer>
    </div>
  );
}

// ============================================================================
// 2. VISTAS DEL CANDIDATO (POBLACIÓN DESPLAZADA)
// ============================================================================

function CandidateDashboard({
  candidate,
  courses,
  enrollments,
  jobs,
  applications,
  onNavigate,
  onCompleteCourse
}) {
  const verifiedSkillsCount = candidate.skills.filter((s) => s.verified).length;

  return (
    <div className="space-y-6">
      {/* Banner de Bienvenida y Progreso de Perfil */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Ruta de Inclusión Socioeconómica
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">Hola, {candidate.name}</h2>
          <p className="text-sm text-amber-50 leading-relaxed">
            Tu Hoja de Vida Dinámica se actualiza automáticamente cada vez que completas y
            certificas un curso gratuito con nuestras instituciones aliadas.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('courses')}
            className="px-4 py-2.5 rounded-xl bg-white text-amber-700 font-bold text-sm shadow hover:bg-amber-50 transition"
          >
            Explorar Cursos Gratuitos
          </button>
          <button
            onClick={() => onNavigate('jobs')}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm shadow hover:bg-slate-800 transition"
          >
            Ver Vacantes ({jobs.length})
          </button>
        </div>
      </div>

      {/* KPIs del Candidato */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{verifiedSkillsCount}</p>
            <p className="text-xs font-medium text-slate-500">Competencias certificadas</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{enrollments.length}</p>
            <p className="text-xs font-medium text-slate-500">Cursos inscritos / historial</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{applications.length}</p>
            <p className="text-xs font-medium text-slate-500">Postulaciones activas</p>
          </div>
        </div>
      </div>

      {/* Sección dividida: Cursos en Progreso y Vacantes Recomendadas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mis Capacitaciones Activas */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-600" /> Mis Capacitaciones
            </h3>
            <button
              onClick={() => onNavigate('courses')}
              className="text-xs font-bold text-amber-600 hover:underline"
            >
              Ver catálogo →
            </button>
          </div>

          {enrollments.length === 0 ? (
            <p className="text-sm text-slate-500 py-6 text-center">
              Aún no estás inscrito en cursos. Explora la oferta gratuita del SENA y aliados.
            </p>
          ) : (
            <div className="space-y-3">
              {enrollments.map((enr) => {
                const course = courses.find((c) => c.id === enr.courseId);
                if (!course) return null;
                return (
                  <div
                    key={enr.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-bold text-sm text-slate-900">{course.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{course.institution}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {enr.status === 'En curso' && (
                        <button
                          onClick={() => onCompleteCourse(enr.id)}
                          className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition"
                        >
                          Finalizar y Solicitar Certificado
                        </button>
                      )}
                      {enr.status === 'Pendiente de certificación' && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                          En validación institucional
                        </span>
                      )}
                      {enr.status === 'Certificado' && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Certificado
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Últimas Vacantes Compatibles */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-600" /> Vacantes Gastronómicas Recientes
            </h3>
            <button
              onClick={() => onNavigate('jobs')}
              className="text-xs font-bold text-amber-600 hover:underline"
            >
              Postularme →
            </button>
          </div>

          <div className="space-y-3">
            {jobs.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="font-bold text-sm text-slate-900">{job.title}</p>
                  <p className="text-xs text-slate-600">
                    {job.company} • <span className="font-semibold text-emerald-700">{job.salary}</span>
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('jobs')}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-800 shrink-0"
                >
                  Ver oferta
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Funcionalidad 2: Consultar y filtrar oferta educativa gratuita
function CandidateCoursesView({ courses, enrollments, onEnroll, onCompleteCourse }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('Todas');

  const areas = ['Todas', 'Cocina', 'Servicio', 'Barismo', 'Manipulación de alimentos'];

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesArea = selectedArea === 'Todas' || c.area === selectedArea;
      const matchesQuery =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.skillsGranted.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesArea && matchesQuery;
    });
  }, [courses, searchTerm, selectedArea]);

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda y filtros por área de interés */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar curso por nombre, competencia o institución (ej. SENA, barismo)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Área de interés:
          </span>
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                selectedArea === area
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Catálogo de Cursos Gratuitos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCourses.map((course) => {
          const enrollment = enrollments.find((e) => e.courseId === course.id);
          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-amber-300 transition"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                    {course.area}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                    100% Gratuito • {course.spots} cupos
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 leading-snug">{course.title}</h3>
                <p className="text-xs font-semibold text-slate-600 mt-1 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  {course.institution}
                </p>

                <p className="text-sm text-slate-600 mt-3 leading-relaxed">{course.description}</p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>
                      <strong>Duración:</strong> {course.duration} ({course.modality})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>
                      <strong>Horario:</strong> {course.schedule}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Competencias que certifica en tu Hoja de Vida:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {course.skillsGranted.map((sk) => (
                      <span
                        key={sk}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold"
                      >
                        + {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                {!enrollment && (
                  <button
                    onClick={() => onEnroll(course.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4" /> Inscribirme al Curso Gratuito
                  </button>
                )}

                {enrollment?.status === 'En curso' && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <span className="flex-1 py-2 px-3 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center">
                      Inscrito • Cursando actualmente
                    </span>
                    <button
                      onClick={() => onCompleteCourse(enrollment.id)}
                      className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                    >
                      Completar y Pedir Certificado
                    </button>
                  </div>
                )}

                {enrollment?.status === 'Pendiente de certificación' && (
                  <div className="py-2.5 px-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold text-center">
                    Curso completado • Esperando validación de {course.institution}
                  </div>
                )}

                {enrollment?.status === 'Certificado' && (
                  <div className="py-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Competencia Certificada en tu Perfil
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Funcionalidad 3: Gestionar la hoja de vida / perfil dinámico progresivo
function CandidateResumeView({ candidate, onUpdateProfile, onPreviewPublic }) {
  const [summary, setSummary] = useState(candidate.summary);
  const [availability, setAvailability] = useState(candidate.availability);
  const [location, setLocation] = useState(candidate.location);
  const [newSkill, setNewSkill] = useState('');
  const [newExp, setNewExp] = useState({ role: '', place: '', period: '', details: '' });
  const [showExpForm, setShowExpForm] = useState(false);

  useEffect(() => {
    setSummary(candidate.summary);
    setAvailability(candidate.availability);
    setLocation(candidate.location);
  }, [candidate]);

  const handleSaveBasic = (e) => {
    e.preventDefault();
    onUpdateProfile({ summary, availability, location });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    const exists = candidate.skills.some(
      (s) => s.name.toLowerCase() === newSkill.trim().toLowerCase()
    );
    if (!exists) {
      onUpdateProfile({
        skills: [
          ...candidate.skills,
          { name: newSkill.trim(), verified: false, issuer: 'Autodeclarada' }
        ]
      });
    }
    setNewSkill('');
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    if (!newExp.role.trim() || !newExp.place.trim()) return;
    onUpdateProfile({
      experience: [
        { ...newExp, id: `exp-${Date.now()}` },
        ...candidate.experience
      ]
    });
    setNewExp({ role: '', place: '', period: '', details: '' });
    setShowExpForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado de Hoja de Vida Dinámica */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-extrabold text-slate-900">{candidate.name}</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Perfil Dinámico Activo
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {candidate.email} • {candidate.phone}
          </p>
        </div>
        <button
          onClick={onPreviewPublic}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Eye className="w-4 h-4" /> Vista previa para Empleadores
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Columna Izquierda: Perfil y Competencias */}
        <div className="lg:col-span-7 space-y-6">
          <form
            onSubmit={handleSaveBasic}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
          >
            <h4 className="font-bold text-base text-slate-900">Información Profesional</h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Perfil ocupacional / Resumen
              </label>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Disponibilidad horaria
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option>Tiempo completo</option>
                  <option>Medio tiempo</option>
                  <option>Turnos rotativos / Fines de semana</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Zona de residencia
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition"
            >
              Guardar Cambios del Perfil
            </button>
          </form>

          {/* Competencias Técnicas (Verificadas vs Autodeclaradas) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div>
              <h4 className="font-bold text-base text-slate-900">
                Competencias Técnicas y Gastronómicas
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Las insignias verdes se agregan automáticamente al aprobar cursos certificados.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-2 rounded-xl border text-xs flex items-center gap-2 ${
                    skill.verified
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 font-medium'
                  }`}
                >
                  {skill.verified ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Star className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                  <div>
                    <span>{skill.name}</span>
                    <span className="block text-[10px] opacity-75">
                      {skill.verified ? `Verificado por ${skill.issuer}` : 'Habilidad registrada'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddSkill} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Agregar otra habilidad práctica (ej. Parrilla, Inventarios)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
              >
                + Agregar
              </button>
            </form>
          </div>
        </div>

        {/* Columna Derecha: Certificaciones Automáticas y Experiencia */}
        <div className="lg:col-span-5 space-y-6">
          {/* Certificaciones Validadas en Tiempo Real */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" /> Certificaciones Institucionales
            </h4>

            {candidate.certifications.length === 0 ? (
              <p className="text-xs text-slate-500">
                Aún no tienes certificaciones emitidas. Completa un curso gratuito para obtener tu
                primer respaldo.
              </p>
            ) : (
              <div className="space-y-3">
                {candidate.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        Código: {cert.code}
                      </span>
                      <span className="text-[11px] text-slate-500">{cert.date}</span>
                    </div>
                    <p className="font-bold text-sm text-slate-900 mt-1">{cert.courseTitle}</p>
                    <p className="text-xs text-emerald-800 mt-0.5">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Experiencia Laboral / Práctica */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base text-slate-900">Experiencia Práctica</h4>
              <button
                type="button"
                onClick={() => setShowExpForm(!showExpForm)}
                className="text-xs font-bold text-amber-600 hover:underline"
              >
                {showExpForm ? 'Cancelar' : '+ Añadir experiencia'}
              </button>
            </div>

            {showExpForm && (
              <form
                onSubmit={handleAddExperience}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <input
                  type="text"
                  placeholder="Cargo (ej. Auxiliar de cocina)"
                  value={newExp.role}
                  onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                />
                <input
                  type="text"
                  placeholder="Establecimiento o proyecto"
                  value={newExp.place}
                  onChange={(e) => setNewExp({ ...newExp, place: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                />
                <input
                  type="text"
                  placeholder="Periodo (ej. 2025 - 6 meses)"
                  value={newExp.period}
                  onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                />
                <textarea
                  rows={2}
                  placeholder="Funciones principales..."
                  value={newExp.details}
                  onChange={(e) => setNewExp({ ...newExp, details: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-slate-900 text-white text-xs font-bold"
                >
                  Guardar Experiencia
                </button>
              </form>
            )}

            <div className="space-y-3">
              {candidate.experience.map((exp) => (
                <div key={exp.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="font-bold text-sm text-slate-900">{exp.role}</p>
                  <p className="text-xs font-semibold text-amber-700">
                    {exp.place} • {exp.period}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">{exp.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Funcionalidad 6: Postular a ofertas de empleo formales
function CandidateJobsView({ candidate, jobs, applications, onApply }) {
  const [areaFilter, setAreaFilter] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const areas = ['Todas', 'Cocina', 'Barismo', 'Servicio'];

  const candidateSkillNames = useMemo(
    () => new Set(candidate.skills.map((s) => s.name.toLowerCase())),
    [candidate.skills]
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchArea = areaFilter === 'Todas' || job.area === areaFilter;
      const matchText =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());
      return matchArea && matchText;
    });
  }, [jobs, areaFilter, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar vacantes formales por cargo o restaurante..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-1">Área gastronómica:</span>
          {areas.map((a) => (
            <button
              key={a}
              onClick={() => setAreaFilter(a)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                areaFilter === a
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const appliedApp = applications.find((a) => a.jobId === job.id);
          const matchingSkills = job.requiredSkills.filter((req) =>
            candidateSkillNames.has(req.toLowerCase())
          );
          const matchPercent = Math.round(
            (matchingSkills.length / Math.max(1, job.requiredSkills.length)) * 100
          );

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
                    {job.businessType}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    Compatibilidad con tu perfil: {matchPercent}%
                  </span>
                  <span className="text-xs text-slate-400">{job.createdAt}</span>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">{job.title}</h3>
                  <p className="text-sm font-semibold text-amber-700">{job.company}</p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">{job.description}</p>

                <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                    <DollarSign className="w-4 h-4" /> {job.salary}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" /> {job.schedule}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-xs font-bold text-slate-500 mr-1">Requisitos:</span>
                  {job.requiredSkills.map((req) => {
                    const hasIt = candidateSkillNames.has(req.toLowerCase());
                    return (
                      <span
                        key={req}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                          hasIt
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {hasIt && <Check className="w-3 h-3" />}
                        {req}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="lg:w-56 shrink-0 flex flex-col gap-2">
                {appliedApp ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <p className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Ya te postulaste
                    </p>
                    <p className="text-[11px] text-emerald-700 mt-1">
                      Estado actual: <strong>{appliedApp.status}</strong>
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => onApply(job.id)}
                    className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Postular Perfil Verificado
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Seguimiento de Postulaciones del Candidato
function CandidateApplicationsView({ jobs, applications, onNavigate }) {
  const statusStyles = {
    'En revisión': 'bg-blue-50 text-blue-700 border-blue-200',
    Entrevistado: 'bg-amber-50 text-amber-800 border-amber-200',
    Contratado: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    Rechazado: 'bg-slate-100 text-slate-600 border-slate-200'
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-slate-900">Seguimiento de Mis Postulaciones</h3>
          <p className="text-xs text-slate-500">
            Recibirás notificaciones en tiempo real cuando los empleadores actualicen tu estado.
          </p>
        </div>
        <button
          onClick={() => onNavigate('jobs')}
          className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700"
        >
          Buscar más vacantes
        </button>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-10 text-sm text-slate-500">
          Aún no has enviado postulaciones. Explora las vacantes disponibles para iniciar tu
          vinculación laboral.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {applications.map((app) => {
            const job = jobs.find((j) => j.id === app.jobId);
            if (!job) return null;
            return (
              <div
                key={app.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-bold text-base text-slate-900">{job.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {job.company} • Postulado el {app.appliedAt}
                  </p>
                </div>
                <span
                  className={`px-3.5 py-1.5 rounded-full border text-xs font-bold self-start sm:self-auto ${
                    statusStyles[app.status] || statusStyles['En revisión']
                  }`}
                >
                  Estado: {app.status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 3. VISTAS DEL EMPLEADOR (RESTAURANTES, HOTELES, CATERING)
// ============================================================================

function EmployerDashboard({
  employer,
  jobs,
  candidates,
  applications,
  onNavigate,
  onInspectCandidate
}) {
  const activeJobs = jobs.filter((j) => j.status === 'Activa');
  const hiredCount = applications.filter((a) => a.status === 'Contratado').length;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-xs font-semibold">
            <Utensils className="w-3.5 h-3.5" /> Portal de Contratación Especializada
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">{employer.name}</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Reduce tiempos y costos de reclutamiento contratando talento gastronómico con
            competencias certificadas por el SENA, Alcaldías y ONGs aliadas.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('manage-jobs')}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow transition"
          >
            + Publicar Nueva Vacante
          </button>
          <button
            onClick={() => onNavigate('search-candidates')}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm shadow transition"
          >
            Buscar Talento Certificado
          </button>
        </div>
      </div>

      {/* KPIs Empleador */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{activeJobs.length}</p>
            <p className="text-xs font-medium text-slate-500">Vacantes activas publicadas</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{applications.length}</p>
            <p className="text-xs font-medium text-slate-500">Postulaciones recibidas</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{hiredCount}</p>
            <p className="text-xs font-medium text-slate-500">Candidatos contratados</p>
          </div>
        </div>
      </div>

      {/* Talento Verificado Destacado */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" /> Catálogo de Candidatos Verificados
          </h3>
          <button
            onClick={() => onNavigate('search-candidates')}
            className="text-xs font-bold text-amber-600 hover:underline"
          >
            Filtrar por habilidad →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {candidates.map((cand) => (
            <div
              key={cand.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between gap-3"
            >
              <div>
                <p className="font-bold text-sm text-slate-900">{cand.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{cand.availability}</p>
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {cand.skills
                    .filter((s) => s.verified)
                    .slice(0, 3)
                    .map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold"
                      >
                        ✓ {s.name}
                      </span>
                    ))}
                </div>
              </div>
              <button
                onClick={() => onInspectCandidate(cand)}
                className="w-full py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-800"
              >
                Ver Hoja de Vida Certificada
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Funcionalidad 4: Publicar y administrar vacantes de empleo (crear, editar, cerrar)
function EmployerJobsView({ jobs, applications, onSaveJob, onToggleStatus }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    area: 'Cocina',
    location: 'Zona Gastronómica Centro',
    salary: '$1.450.000 + Prestaciones',
    contractType: 'Término Fijo (Formal)',
    schedule: 'Turnos rotativos',
    requiredSkillsText: 'Auxiliar de cocina, Manipulación de alimentos',
    description: ''
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({
      title: '',
      area: 'Cocina',
      location: 'Zona Gastronómica Centro',
      salary: '$1.450.000 + Prestaciones',
      contractType: 'Término Fijo (Formal)',
      schedule: 'Turnos rotativos',
      requiredSkillsText: 'Auxiliar de cocina, Manipulación de alimentos',
      description: ''
    });
    setShowForm(true);
  };

  const handleOpenEdit = (job) => {
    setEditingId(job.id);
    setForm({
      title: job.title,
      area: job.area,
      location: job.location,
      salary: job.salary,
      contractType: job.contractType,
      schedule: job.schedule,
      requiredSkillsText: job.requiredSkills.join(', '),
      description: job.description
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const requiredSkills = form.requiredSkillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onSaveJob(
      {
        title: form.title,
        area: form.area,
        location: form.location,
        salary: form.salary,
        contractType: form.contractType,
        schedule: form.schedule,
        requiredSkills,
        description:
          form.description ||
          'Vacante formal en el sector gastronómico para personal capacitado y certificado.'
      },
      editingId
    );
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="font-bold text-lg text-slate-900">Administración de Vacantes</h3>
          <p className="text-xs text-slate-500">
            Crea, edita o cierra ofertas laborales especificando las competencias requeridas.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Publicar Nueva Vacante
        </button>
      </div>

      {/* Formulario Crear / Editar Vacante */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl border-2 border-amber-500 shadow-lg space-y-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-base text-slate-900">
              {editingId ? 'Editar Oferta Laboral' : 'Nueva Oferta Laboral Gastronómica'}
            </h4>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="p-1 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Título del puesto *
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Auxiliar de Cocina / Parrillero"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Área gastronómica
              </label>
              <select
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
              >
                <option>Cocina</option>
                <option>Barismo</option>
                <option>Servicio</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Salario y beneficios
              </label>
              <input
                type="text"
                value={form.salary}
                onChange={(e) => setForm({ ...form, salary: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ubicación y Horario
              </label>
              <input
                type="text"
                value={form.schedule}
                onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Habilidades técnicas requeridas (separadas por coma)
            </label>
            <input
              type="text"
              value={form.requiredSkillsText}
              onChange={(e) => setForm({ ...form, requiredSkillsText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Descripción del cargo y funciones
            </label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
            >
              {editingId ? 'Guardar Cambios' : 'Publicar Vacante Ahora'}
            </button>
          </div>
        </form>
      )}

      {/* Lista de Vacantes del Empleador */}
      <div className="space-y-4">
        {jobs.map((job) => {
          const countApps = applications.filter((a) => a.jobId === job.id).length;
          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      job.status === 'Activa'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {job.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {countApps} postulantes recibidos
                  </span>
                </div>
                <h4 className="font-bold text-lg text-slate-900">{job.title}</h4>
                <p className="text-xs text-slate-600">
                  {job.salary} • {job.schedule}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.requiredSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleOpenEdit(job)}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Editar
                </button>
                <button
                  onClick={() => onToggleStatus(job.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                    job.status === 'Activa'
                      ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
                      : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {job.status === 'Activa' ? 'Cerrar Vacante' : 'Reabrir Vacante'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Funcionalidad 5: Buscar y filtrar candidatos verificados
function EmployerSearchCandidatesView({ candidates, onInspectCandidate, onSendInvite }) {
  const [skillFilter, setSkillFilter] = useState('Todas');
  const [availabilityFilter, setAvailabilityFilter] = useState('Todas');
  const [onlyCertified, setOnlyCertified] = useState(true);

  const skillOptions = [
    'Todas',
    'Auxiliar de cocina',
    'Manipulación de alimentos',
    'Barismo',
    'Mesero'
  ];

  const filteredCandidates = useMemo(() => {
    return candidates.filter((cand) => {
      const matchAvail =
        availabilityFilter === 'Todas' || cand.availability === availabilityFilter;
      const matchCert = !onlyCertified || cand.skills.some((s) => s.verified);
      const matchSkill =
        skillFilter === 'Todas' ||
        cand.skills.some((s) => s.name.toLowerCase().includes(skillFilter.toLowerCase()));
      return matchAvail && matchCert && matchSkill;
    });
  }, [candidates, skillFilter, availabilityFilter, onlyCertified]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Habilidad técnica:</span>
            {skillOptions.map((sk) => (
              <button
                key={sk}
                onClick={() => setSkillFilter(sk)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                  skillFilter === sk
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sk}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyCertified}
              onChange={(e) => setOnlyCertified(e.target.checked)}
              className="rounded text-emerald-600"
            />
            Solo perfiles con certificación institucional
          </label>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">Disponibilidad:</span>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
          >
            <option value="Todas">Cualquier disponibilidad</option>
            <option value="Tiempo completo">Tiempo completo</option>
            <option value="Turnos rotativos / Fines de semana">
              Turnos rotativos / Fines de semana
            </option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCandidates.map((cand) => (
          <div
            key={cand.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-lg text-slate-900">{cand.name}</h4>
                  <p className="text-xs text-slate-500">
                    {cand.location} • {cand.availability}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verificado
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">{cand.summary}</p>

              <div className="mt-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Competencias validadas:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cand.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        s.verified
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {s.verified ? `✓ ${s.name} (${s.issuer})` : s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => onInspectCandidate(cand)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
              >
                Revisar Hoja de Vida
              </button>
              <button
                onClick={() => onSendInvite(cand)}
                className="py-2.5 px-3 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition"
              >
                Invitar a Vacante
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Funcionalidad 7: Gestionar postulaciones de candidatos y estados de selección
function EmployerApplicationsView({
  jobs,
  candidates,
  applications,
  onUpdateStatus,
  onInspectCandidate
}) {
  const selectionStates = ['En revisión', 'Entrevistado', 'Contratado', 'Rechazado'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
      <div>
        <h3 className="font-bold text-lg text-slate-900">
          Gestión de Postulaciones y Proceso de Selección
        </h3>
        <p className="text-xs text-slate-500">
          Revisa las hojas de vida recibidas y actualiza el estado del candidato. Cada cambio
          notifica automáticamente al postulante.
        </p>
      </div>

      {applications.length === 0 ? (
        <p className="text-sm text-slate-500 py-8 text-center">
          No hay postulaciones registradas todavía.
        </p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const job = jobs.find((j) => j.id === app.jobId);
            const cand = candidates.find((c) => c.id === app.candidateId);
            if (!job || !cand) return null;

            return (
              <div
                key={app.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                      Vacante: {job.title}
                    </span>
                    <span className="text-xs text-slate-400">Aplicó: {app.appliedAt}</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900">{cand.name}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cand.skills
                      .filter((s) => s.verified)
                      .map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold"
                        >
                          ✓ {s.name}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onInspectCandidate(cand)}
                    className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-800 flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" /> Ver HV
                  </button>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-600">Estado:</label>
                    <select
                      value={app.status}
                      onChange={(e) => onUpdateStatus(app.id, e.target.value)}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer ${
                        app.status === 'Contratado'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : app.status === 'Entrevistado'
                          ? 'bg-amber-500 text-white border-amber-500'
                          : 'bg-white text-slate-900 border-slate-300'
                      }`}
                    >
                      {selectionStates.map((st) => (
                        <option key={st} value={st} className="bg-white text-slate-900">
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 4. VISTAS DE INSTITUCIÓN FORMADORA / ALIADO (SENA, ONGs, ALCALDÍAS)
// ============================================================================

function InstitutionDashboard({
  institution,
  courses,
  enrollments,
  candidates,
  applications,
  onNavigate,
  onCertify
}) {
  const pendingCerts = enrollments.filter((e) => e.status === 'Pendiente de certificación');
  const totalCerts = enrollments.filter((e) => e.status === 'Certificado').length;
  const hiredGraduates = applications.filter((a) => a.status === 'Contratado').length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-800 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" /> Portal de Aliados Formadores y Certificación
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">{institution.name}</h2>
          <p className="text-sm text-emerald-50 leading-relaxed">
            Gestiona la oferta formativa gratuita y certifica en tiempo real las competencias de
            los beneficiarios para maximizar su inserción laboral efectiva.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('validate-certs')}
            className="px-4 py-2.5 rounded-xl bg-white text-emerald-800 font-bold text-sm shadow hover:bg-emerald-50 transition"
          >
            Validar Certificados ({pendingCerts.length})
          </button>
          <button
            onClick={() => onNavigate('manage-courses')}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm shadow hover:bg-slate-800 transition"
          >
            + Publicar Curso Gratuito
          </button>
        </div>
      </div>

      {/* Métricas de Impacto Social */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{courses.length}</p>
            <p className="text-xs font-medium text-slate-500">Programas de formación activos</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{pendingCerts.length}</p>
            <p className="text-xs font-medium text-slate-500">Certificaciones por aprobar</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{hiredGraduates}</p>
            <p className="text-xs font-medium text-slate-500">Egresados vinculados formalmente</p>
          </div>
        </div>
      </div>

      {/* Solicitudes Pendientes de Certificación en Tiempo Real */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> Validación Rápida de Competencias
        </h3>

        {pendingCerts.length === 0 ? (
          <p className="text-sm text-slate-500 py-6 text-center">
            Todas las solicitudes de certificación están al día.
          </p>
        ) : (
          <div className="space-y-3">
            {pendingCerts.map((enr) => {
              const course = courses.find((c) => c.id === enr.courseId);
              const cand = candidates.find((c) => c.id === enr.candidateId);
              if (!course || !cand) return null;
              return (
                <div
                  key={enr.id}
                  className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-bold text-sm text-slate-900">{cand.name}</p>
                    <p className="text-xs text-slate-600">
                      Curso completado: <strong>{course.title}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => onCertify(enr.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Emitir Certificado y Actualizar HV
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Vista completa de Certificación en Tiempo Real (Institución / Aliado)
function InstitutionValidateCertsView({ enrollments, courses, candidates, onCertify }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
      <div>
        <h3 className="font-bold text-lg text-slate-900">
          Certificación de Competencias en Tiempo Real
        </h3>
        <p className="text-xs text-slate-500">
          Al validar la aprobación de un participante, sus competencias quedan respaldadas
          automáticamente en su Hoja de Vida Dinámica frente a todos los restaurantes.
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {enrollments.map((enr) => {
          const course = courses.find((c) => c.id === enr.courseId);
          const cand = candidates.find((c) => c.id === enr.candidateId);
          if (!course || !cand) return null;

          return (
            <div
              key={enr.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <p className="font-bold text-sm text-slate-900">{cand.name}</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Programa: <strong>{course.title}</strong> ({course.area})
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Inscrito el {enr.enrolledAt} • Otorga: {course.skillsGranted.join(', ')}
                </p>
              </div>

              <div>
                {enr.status === 'Certificado' ? (
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Certificado Emitido
                  </span>
                ) : (
                  <button
                    onClick={() => onCertify(enr.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition"
                  >
                    Aprobar y Certificar Competencias
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Vista de Carga de Oferta Educativa Gratuita (Institución / Aliado)
function InstitutionCoursesView({ courses, onCreateCourse }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    area: 'Cocina',
    duration: '60 horas',
    modality: 'Presencial',
    schedule: 'Lunes a Viernes 8:00 AM - 12:00 PM',
    spots: 20,
    skillsText: 'Auxiliar de cocina, Manipulación de alimentos',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onCreateCourse({
      title: form.title,
      area: form.area,
      duration: form.duration,
      modality: form.modality,
      schedule: form.schedule,
      spots: Number(form.spots) || 15,
      skillsGranted: form.skillsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      description:
        form.description ||
        'Curso gratuito de formación técnica orientado a la inserción laboral en el sector gastronómico.'
    });
    setShowForm(false);
    setForm({
      title: '',
      area: 'Cocina',
      duration: '60 horas',
      modality: 'Presencial',
      schedule: 'Lunes a Viernes 8:00 AM - 12:00 PM',
      spots: 20,
      skillsText: 'Auxiliar de cocina, Manipulación de alimentos',
      description: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg text-slate-900">Catálogo de Oferta Formativa</h3>
          <p className="text-xs text-slate-500">
            Publica cursos gratuitos para notificar automáticamente a los candidatos inscritos.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Publicar Nuevo Curso
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl border-2 border-emerald-600 shadow-lg space-y-4"
        >
          <h4 className="font-bold text-base text-slate-900">Nuevo Curso Gratuito</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nombre del curso *
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Cocina Colombiana y Parrilla"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Área temática</label>
              <select
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
              >
                <option>Cocina</option>
                <option>Servicio</option>
                <option>Barismo</option>
                <option>Manipulación de alimentos</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Duración y Cupos
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="w-1/2 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
                <input
                  type="number"
                  value={form.spots}
                  onChange={(e) => setForm({ ...form, spots: Number(e.target.value) })}
                  className="w-1/2 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Horario</label>
              <input
                type="text"
                value={form.schedule}
                onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Competencias que certifica (separadas por coma)
            </label>
            <input
              type="text"
              value={form.skillsText}
              onChange={(e) => setForm({ ...form, skillsText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Descripción</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800"
            >
              Publicar y Notificar Candidatos
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                {course.area}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {course.spots} cupos disponibles
              </span>
            </div>
            <h4 className="font-bold text-base text-slate-900">{course.title}</h4>
            <p className="text-xs text-slate-500">{course.institution}</p>
            <p className="text-xs text-slate-600">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 5. MODAL DE HOJA DE VIDA VERIFICADA (VISTA COMPARTIDA)
// ============================================================================

function CandidateProfileModal({ candidate, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50">
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Hoja de Vida Dinámica Verificada
            </span>
            <h3 className="text-xl font-extrabold text-slate-900">{candidate.name}</h3>
            <p className="text-xs text-slate-600 mt-0.5">
              {candidate.location} • {candidate.availability} • {candidate.phone}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Perfil Ocupacional
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">{candidate.summary}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Competencias Técnicas Validadas
            </h4>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((s, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                    s.verified
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {s.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {s.name} {s.verified ? `(${s.issuer})` : ''}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Certificaciones Institucionales Emitidas
            </h4>
            <div className="space-y-2">
              {candidate.certifications.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-slate-900">{c.courseTitle}</p>
                    <p className="text-emerald-800">{c.issuer}</p>
                  </div>
                  <span className="font-mono font-bold text-emerald-700">{c.code}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Experiencia Práctica
            </h4>
            <div className="space-y-2">
              {candidate.experience.map((exp) => (
                <div key={exp.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="font-bold text-sm text-slate-900">{exp.role}</p>
                  <p className="text-xs text-amber-700 font-semibold">
                    {exp.place} • {exp.period}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">{exp.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}