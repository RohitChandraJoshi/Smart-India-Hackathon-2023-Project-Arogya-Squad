import { CalendarOutlined, UserOutlined } from '@ant-design/icons'

import { Calender } from '../features/calender/Calender'
import Guides from '../features/guides/Guides'
import MyAppointments from '../features/myAppointments/MyAppointments'
const routes = [
  {
    title: 'Guides',
    icon: UserOutlined,
    path: '',
    component: Guides,
    visibleOnMenu: true,
  },
  {
    title: 'My Appointments',   
    icon: CalendarOutlined,
    path: 'myappointments',
    component: MyAppointments,
    visibleOnMenu: true,
  },
  {
    title: 'Book an Appointment',
    icon: CalendarOutlined,
    path: '/dashboard/meeting/book',
    component: Calender,
    visibleOnMenu: false,
  },
]

export default routes
