// import { EventInput } from '@fullcalendar/common';

// ----------------------------------------------------------------------

export type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

export type CalendarState = {
  isLoading: boolean;
  error: Error | string | null;
  events: any[];   // any should be replaced by EventInput
  isOpenModal: boolean;
  selectedEventId: null | string;
  selectedRange: null | { start: Date; end: Date };
};
