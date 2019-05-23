import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { RouterModule } from "@angular/router";
import { MatTableModule } from  '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.css']
})
export class ViewComponentComponent implements OnInit {

  bucketName = localStorage.getItem('selectedProvider') + ": " + localStorage.getItem('bucketName');
  json = {};
  jsonn = {};
  json2 = {};
  json3 = {};
  list = [];
  listPrevious = [];
  downloadableObjects = [];
  downloadableObjectsPrevious = [];
  objectAddress = "";
  i: any;
  getList = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

    onNavigate(){
      if(this.listPrevious.length == 0){
          this.getList = false;
          this.list = [];
          this.downloadableObjects = [];
          this.router.navigate(['/']).then(
              nav => {
                  //console.log(this.list);
              },
              err => {console.log(err);}
          );
      }
      this.list = [];
      this.downloadableObjects = [];
      this.list = this.listPrevious[this.listPrevious.length-1];
      this.downloadableObjects = this.downloadableObjectsPrevious[this.downloadableObjectsPrevious.length-1];
      this.listPrevious.pop();
      this.downloadableObjectsPrevious.pop();
      console.log(this.downloadableObjects);
    }

    onGetData(){
      /*for(let i of this.list){
          this.list[i] = this.list[i].splice(0,-1);
      }*/
      this.getList=true;
    }

    moveIn(name){
      this.jsonn = {"Prefix": name,
          "accessKeyId": localStorage.getItem("accessKeyID"),
          "secretAccessKey": localStorage.getItem("secretAccessKey"),
          "Bucket": localStorage.getItem("bucketName")  };
      console.log(this.jsonn);
      this.listPrevious[this.listPrevious.length] = this.list;
      this.downloadableObjectsPrevious[this.downloadableObjectsPrevious.length] = this.downloadableObjects;
      console.log(this.listPrevious);
      console.log(this.downloadableObjectsPrevious);
      this.list = [];
      this.downloadableObjects = [];
        this.http.post('http://major-env.ce6uvvep3h.us-east-1.elasticbeanstalk.com/list', this.jsonn).subscribe(
            (response) => {
                this.json = response;
                //console.log(this.json);
                for(this.i = 0; this.i < response["CommonPrefixes"].length; this.i++){
                    this.list.push(response["CommonPrefixes"][this.i].Prefix);
                }
                if(response["Contents"].length > 0){
                    for(this.i = 0; this.i < response["Contents"].length; this.i++){
                        this.downloadableObjects.push(response["Contents"][this.i].Key);
                    }
                }
                /*console.log(this.downloadableObjects);
                console.log(this.list);
                console.log(response);*/
            },
            err => {
                console.log(err);
            }
        );
    }

    downloadObject(obj){
      this.json2 = {Key: obj,
          "accessKeyId": localStorage.getItem("accessKeyID"),
          "secretAccessKey": localStorage.getItem("secretAccessKey"),
          "Bucket": localStorage.getItem("bucketName")};
      console.log(this.json2);
      this.http.post('http://major-env.ce6uvvep3h.us-east-1.elasticbeanstalk.com/getobject', this.json2).subscribe(
          (response) => {
              this.objectAddress = response["url"];
              window.open(this.objectAddress, "_blank");
              console.log(this.objectAddress);
          },
          err => {
              console.log(err);
          }
          );
    }

  ngOnInit() {
      this.json3 = {
          "Prefix": "",
          "accessKeyId": localStorage.getItem("accessKeyID"),
          "secretAccessKey": localStorage.getItem("secretAccessKey"),
          "Bucket": localStorage.getItem("bucketName")};
      this.http.post('http://major-env.ce6uvvep3h.us-east-1.elasticbeanstalk.com/list', this.json3).subscribe(
          (response) => {
              for(this.i = 0; this.i < response["CommonPrefixes"].length; this.i++){
                  this.list.push(response["CommonPrefixes"][this.i].Prefix);
              }
              //console.log(this.list);
          },
          err => {
              console.log(err);
          }
      );
  }

}
