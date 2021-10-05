import { Component, OnInit } from '@angular/core';
import { Ensenanza } from 'src/app/models/ensenanza';
import { EnseñanzaService } from 'src/app/services/enseñanza/enseñanza.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class categoriesComponent implements OnInit {
  listEnsenyanza!: Ensenanza[];
  constructor(private _enseñanzaService: EnseñanzaService) { }

  ngOnInit(): void {
    this.obtenerCurso();
  }
  obtenerCurso() {
    this._enseñanzaService.findAllEnsenanza().subscribe(data => {
      this.listEnsenyanza = data;
      console.log(this.listEnsenyanza);
    }, error => {
      console.log(error);
    })
  }
}
