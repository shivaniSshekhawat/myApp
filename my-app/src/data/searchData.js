export const searchData = [
  {
    id: 1,
    type: 'person',
    name: 'Randall Johnsson',
    status: 'Active now',
    statusColor: 'green',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    lastActive: null
  },
  {
    id: 2,
    type: 'folder',
    name: 'Random Michal Folder',
    fileCount: 12,
    location: 'Photos',
    lastEdited: '12m ago',
    icon: 'folder'
  },
  {
    id: 3,
    type: 'file',
    name: 'crative_file_frandkies.jpg',
    fileType: 'image',
    location: 'Photos/Assets',
    lastEdited: '12m ago',
    icon: 'image'
  },
  {
    id: 4,
    type: 'person',
    name: 'Kristinge Karand',
    status: 'Active 2d ago',
    statusColor: 'yellow',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    lastActive: '2d ago'
  },
  {
    id: 5,
    type: 'file',
    name: 'files_krande_michelle.avi',
    fileType: 'video',
    location: 'Videos',
    lastEdited: '12m ago',
    icon: 'video'
  },
  {
    id: 6,
    type: 'person',
    name: 'Caroline Dribsson',
    status: 'Unactivated',
    statusColor: 'red',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    lastActive: null
  },
  {
    id: 7,
    type: 'person',
    name: 'Adam Cadribean',
    status: 'Active 1w ago',
    statusColor: 'yellow',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    lastActive: '1w ago'
  },
  {
    id: 8,
    type: 'file',
    name: 'final_dribbble_presentation.jpg',
    fileType: 'image',
    location: 'Presentations',
    lastEdited: '1w ago',
    icon: 'image'
  },
  {
    id: 9,
    type: 'person',
    name: 'Margareth Cendribgssen',
    status: 'Active 1w ago',
    statusColor: 'yellow',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
    lastActive: '1w ago'
  },
  {
    id: 10,
    type: 'file',
    name: 'dribbble_animation.avi',
    fileType: 'video',
    location: 'Videos',
    lastEdited: '1y ago',
    icon: 'video'
  },
  {
    id: 11,
    type: 'folder',
    name: 'Dribbble Folder',
    fileCount: 12,
    location: 'Projects',
    lastEdited: '2m ago',
    icon: 'folder'
  }
];

export const filterOptions = [
  { id: 'files', label: 'Files', icon: 'paperclip', enabled: true },
  { id: 'people', label: 'People', icon: 'person', enabled: true },
  { id: 'chats', label: 'Chats', icon: 'chat', enabled: false },
  { id: 'lists', label: 'Lists', icon: 'list', enabled: false, disabled: true }
];
