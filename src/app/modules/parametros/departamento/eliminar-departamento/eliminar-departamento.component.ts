import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { FacultadModel } from 'src/app/models/facultad.model';
import { DepartamentoService } from 'src/app/services/parametros/departamento.service';
import { FacultadService } from 'src/app/services/parametros/facultad.service';

@Component({
  selector: 'app-eliminar-departamento',
  templateUrl: './eliminar-departamento.component.html',
  styleUrls: ['./eliminar-departamento.component.css']
})
export class EliminarDepartamentoComponent implements OnInit {

  
  id: number = 0
  nombre: string = ""
  id_facultad: number = 0
  facultad: string = ""

  constructor(
    private router: Router,
    private service: DepartamentoService,
    private facultadService: FacultadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }


  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: DepartamentoModel) => {
        if(data.id && data.nombre && data.id_facultad){
        this.id = data.id
        this.nombre = data.nombre
        this.id_facultad = data.id_facultad
        //BUSCO LA FACULTAD POR EL ID QUE TIENE EL REGISTRO DE DEPARTAMENTO Y BUSCO LA FACULTAD PARA ASI
        // MOSTRAR EN EL ELIMINAR.HTML  
        let register = this.facultadService.SearchRecord(this.id_facultad).subscribe({
          next: (f: FacultadModel)  => {
            console.log(f);
            if(f.nombre){
            this.facultad = f.nombre
            }
          }
        })             
            }
    }
    });
  }

  RemoveRecord() {
  
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: DepartamentoModel) => {
        this.router.navigate(["/parametros/listar-departamento"]);
      },
      error: (err: any) => {
      }
    });
  }


}
