import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { RouterModule } from "@angular/router";


@Component({
  selector: 'app-backup-storage-config',
  templateUrl: './backup-storage-config.component.html',
  styleUrls: ['./backup-storage-config.component.css']
})
export class BackupStorageConfigComponent implements OnInit {

    accessKeyID = "";
    secretAccessKey = "";
    bucketName = "";
    selectedProvider = "";
    resourceSelected = false;
    resourceOneTrue = false;
    resourceTwoTrue = false;

    onResourceOneSelected(){
      this.selectedProvider = "S3";
      this.resourceOneTrue = !this.resourceOneTrue;
      this.resourceSelected = !this.resourceSelected; 
    }

    onResourceTwoSelected(){
      this.selectedProvider = "Mozy";
      this.resourceTwoTrue = !this.resourceTwoTrue;
      this.resourceSelected = !this.resourceSelected; 
    }

    onSubmit2(){
        localStorage.setItem('accessKeyID', this.accessKeyID);
        localStorage.setItem('secretAccessKey', this.secretAccessKey);
        localStorage.setItem('bucketName', this.bucketName);
        localStorage.setItem('selectedProvider', this.selectedProvider);
      console.log("data submitted");
    }

    onDeleteDetails(){
        localStorage.clear();
      console.log("data deleted");
    }

    onReset2(){
        this.bucketName = "";
        this.accessKeyID = "";
        this.secretAccessKey = "";
    }

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

    onNavigate(){
        this.router.navigate(['/']).then(
            nav => {
                console.log("Entering view mode");
            },
            err => {console.log(err);}
        );
    }

  ngOnInit() {
  }

}
