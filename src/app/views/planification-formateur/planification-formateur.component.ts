import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from 'fullcalendar';
import { Calendrier } from 'src/app/model/Calendrier.modul';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendrierService } from 'src/app/shared/services/calendrier.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-planification-formateur',
  templateUrl: './planification-formateur.component.html',
  styleUrls: ['./planification-formateur.component.css']
})
export class PlanificationFormateurComponent implements OnInit{
 

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
    //select: this.handleDateSelect.bind(this),
    themeSystem: 'bootstrap', 
    contentHeight: 'auto', 
    eventBackgroundColor: '#2ecc71',
    //eventClick: this.handleEventClick.bind(this),
  };

constructor(private calendrierService: CalendrierService,
  private userAuthService:UserAuthService
  ){

}

  ngOnInit(): void {
    this.loadEvents();
  }

  // loadEvents(): void {
  //   let id =this.userAuthService.getUserId();
  //   this.calendrierService.getEventsByFormateurId(parseInt(id)).subscribe(
  //     (response: Calendrier[]) => {

  //       this.events = response;
  //       console.log(response);
        
  //       this.calendarOptions.events = this.events.map(event => ({
  //         id: event.id?.toString(),
  //         title: event.title,
  //         start: new Date(event.datedebut),
  //         end: new Date(event.datefin),
  //         extendedProps:{event}
  //       }));
  //     },
  //     error => {
  //       console.error('Erreur lors du chargement des événements :', error);
  //     }
  //   );
  // }


  loadEvents(): void {
    console.log("anaaaaaaaaaaaaaaa");
    
    if(this.userAuthService.isFormat()){
     let id =this.userAuthService.getUserId();
     console.log("id howaaaaa"+id);
     
     this.calendrierService.getEventsByFormateurId(parseInt(id)).subscribe(
       (response: Calendrier[]) => {
         this.events = response;
         this.calendarOptions.events = this.events.map(event => ({
           title: event.title,
           start: new Date(event.datedebut),
           end: new Date(event.datefin),
           //color: !event.formationId || !event.formateurId?'#ff1111':'#2ecc71',
           extendedProps: { myCustomData: event }
         }));
       },
       error => {
         console.error('Erreur lors du chargement des événements :', error);
       }
     );
    }else{
     this.calendrierService.getEvents().subscribe(
       (response: Calendrier[]) => {
         this.events = response;
         this.calendarOptions.events = this.events.map(event => ({
           title: event.title,
           start: new Date(event.datedebut),
           end: new Date(event.datefin),
           //color: !event.formationId || !event.formateurId?'#ff1111':'#2ecc71',
           extendedProps: { myCustomData: event }
         }));
       },
       error => {
         console.error('Erreur lors du chargement des événements :', error);
       }
     );
   }
 }
  
}
