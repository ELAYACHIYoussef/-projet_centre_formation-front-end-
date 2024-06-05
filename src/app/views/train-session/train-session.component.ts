import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg } from 'fullcalendar';
import { Calendrier } from '../../model/Calendrier.modul';
import { CalendrierService } from '../../shared/services/calendrier.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { AddTraineComponent } from '../add-traine/add-traine.component';

@Component({
  selector: 'app-train-session',
  templateUrl: './train-session.component.html',
  styleUrls: ['./train-session.component.css']
})
export class TrainSessionComponent implements OnInit {
  events: Calendrier[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    plugins: [dayGridPlugin, timeGrigPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    select: this.handleDateSelect.bind(this),
    themeSystem: 'bootstrap', 
    contentHeight: 'auto', 
    eventBackgroundColor: '#2ecc71',
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(private calendrierService: CalendrierService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  handleDateClick(arg: any) {
    console.log('Date clicked: ' + arg.dateStr);
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    console.log("Dialog open: ");
    console.log(selectInfo);
    console.log('Selection Start: ' + selectInfo.startStr);
    console.log('Selection End: ' + selectInfo.endStr);

    const dialogRef = this.dialog.open(AddTraineComponent, {
      width: '400px',
      data: {
        start: selectInfo.startStr,
        end: selectInfo.endStr
      }
    });
  }

  loadEvents(): void {
    this.calendrierService.getEvents().subscribe(
      (response: Calendrier[]) => {

        this.events = response;
        console.log(response);
        
        this.calendarOptions.events = this.events.map(event => ({
          id: event.id?.toString(),
          title: event.title,
          start: new Date(event.datedebut),
          end: new Date(event.datefin),
          extendedProps:{event}
        }));
      },
      error => {
        console.error('Erreur lors du chargement des événements :', error);
      }
    );
  }

  // handleEventClick(clickInfo: any) {
  //   console.log('Event clicked:', clickInfo.event.extendedProps);

  
  //     // console.log('Event ID (string):', clickInfo.event.id);

  //     // const eventId = parseInt(clickInfo.event.id, 10); 

  //     // console.log('Event ID (number):', eventId);
  
  //     //   console.log('Event ID:', eventId);

  //   const dialogRef = this.dialog.open(AddTraineComponent, {
  //     width: '400px',
  //     data: {
  //       eventId: clickInfo.event.id,
  //       start: clickInfo.event.startStr,
  //       end: clickInfo.event.endStr,
  //       title: clickInfo.event.title

  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.loadEvents();
  //     }
  //   });
  // }

  handleEventClick(clickInfo: any) {
    console.log('Event clicked:', clickInfo.event.extendedProps);
  
    const dialogRef = this.dialog.open(AddTraineComponent, {
      width: '400px',
      data: {
        id: clickInfo.event.id,
        start: clickInfo.event.startStr,
        end: clickInfo.event.endStr,
        title: clickInfo.event.title,
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEvents(); // Recharger les événements après la fermeture de la boîte de dialogue si nécessaire
      }
    });
  }
  
}
