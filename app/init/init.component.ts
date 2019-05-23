import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

    onNavigate(){
        this.router.navigate(['/home_component']).then(
            nav => {
                console.log("Entering view mode");
            },
            err => {console.log(err);}
        );
    }

    onNavigate2(){
        this.router.navigate(['/backup_storage_config']).then(
            nav => {
                console.log("Entering view mode");
            },
            err => {console.log(err);}
        );
    }

    onNavigate3(){
        this.router.navigate(['/view_component']).then(
            nav => {
                console.log("Entering view mode");
            },
            err => {console.log(err);}
        );
    }

  ngOnInit() {
  }

}
