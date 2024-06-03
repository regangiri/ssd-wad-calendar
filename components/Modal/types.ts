export interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  date?: string;
  id?: string;
  addEvent?: any;
  editEvent?: any;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  color: string;
  email: string;
  time: string;
}
