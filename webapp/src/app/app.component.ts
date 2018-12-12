import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Backup Config';
  hidden = false;
  root = "";
  onAdd1 = false;
  onAdd2 = false;
  onAdd3 = false;
  hostname = "";
  logFileName = "";
  logFilePath = "";
  tmpFolderPath = "";
  backupName = "";
  backupNameArray: any = new Array();
  backupDir = "";
  backupDirArray: any = new Array();
  mbackupName = "";
  mbackupNameArray: any = new Array();
  mbackupDir = "";
  mbackupDirArray: any = new Array();
  pbackupName = "";
  pbackupNameArray: any = new Array();
  pbackupDir = "";
  pbackupDirArray: any = new Array();
  logSizeYes = false;
  logSizeNo = false;
  eMailReportYes = false;
  eMailReportNo = false;
  eMailSummaryYes = false;
  eMailSummaryNo = false;
  msqlUser = "";
  msqlPass = "";
  psqlUser = "";
  psqlPass = "";
  compressPass = "";
  compressNo = false;
  daysRotation = "";
  s3SyncYes = false;
  s3SyncNo = false;
  bucketPath = "";
  trickleDownload = "";
  trickleUpload = "";
  fileBackup = false;
  mdbBackup = false;
  pdbBackup = false;
  compress = false;
  advancedOpt = false;
  awsSyncYes = false;
  awsSyncNo = false;
  sevenzipSelection = false;
  gzipSelection = false;
  compressSelection = "";
  s3cmdYes = false;
  s3cmdNo = false;
  frontEndCLISelection = "";

  constructor(private http: HttpClient) {
    this.hidden=false;
  }

  click1(){
    this.hidden = !this.hidden;
    //console.log(this.hidden);
  }

  onSelect1(){
    this.fileBackup = !this.fileBackup;
    this.onAdd1 = false;
    this.backupName = "";
    this.backupDir = "";
    this.backupNameArray = [];
    this.backupDirArray = [];
    //console.log(this.fileBackup);
  }

  onSelect2(){
    this.mdbBackup = !this.mdbBackup;
    this.onAdd2 = false;
    this.mbackupName = "";
    this.mbackupDir = "";
    this.mbackupNameArray = [];
    this.mbackupDirArray = [];
    //console.log(this.mdbBackup);
  }

  onSelect3(){
    this.pdbBackup = !this.pdbBackup;
    this.onAdd3 = false;
    this.pbackupName = "";
    this.pbackupDir = "";
    this.pbackupNameArray = [];
    this.pbackupDirArray = [];
    //console.log(this.pdbBackup);
  }

  onSelect4(){
    this.compress = !this.compress;
    this.compressPass = "";
    this.sevenzipSelection = false;
    this.gzipSelection = false;
  }

  onCompressNo(){
    this.compressNo = true;
    this.compressSelection = 'none';
  }

  advancedOptions(){
    this.advancedOpt = !this.advancedOpt;
    this.awsSyncYes = false;
    this.awsSyncNo = false;
    this.s3cmdYes = false;
    this.s3cmdNo = false;
    this.s3SyncYes = false;
    this.s3SyncNo = false;
    this.bucketPath = "";
    this.trickleDownload = "";
    this.trickleUpload = "";
  }

  onAddFileSet(){
    this.onAdd1 = true;
    this.backupNameArray.push(this.backupName);
    this.backupDirArray.push(this.backupDir);
    //console.log(this.backupNameArray);
    //console.log(this.backupDirArray);
  }

  deleteFileSet(set){
    this.backupNameArray.splice(this.backupNameArray.indexOf(set),1);
    this.backupDirArray.splice(this.backupDirArray.indexOf(set),1);
  }

  onAddMDB(){
    this.onAdd2 = true;
    this.mbackupNameArray.push(this.mbackupName);
    this.mbackupDirArray.push(this.mbackupDir);
    //console.log(this.mbackupNameArray);
    //console.log(this.mbackupDirArray);
  }

  deleteMDB(set){
    this.mbackupNameArray.splice(this.mbackupNameArray.indexOf(set),1);
    this.mbackupDirArray.splice(this.mbackupDirArray.indexOf(set),1);
  }

  onAddPDB(){
    this.onAdd3 = true;
    this.pbackupNameArray.push(this.pbackupName);
    this.pbackupDirArray.push(this.pbackupDir);
    //console.log(this.pbackupNameArray);
    //console.log(this.pbackupDirArray);
  }

  deletePDB(set){
    this.pbackupNameArray.splice(this.pbackupNameArray.indexOf(set),1);
    this.pbackupDirArray.splice(this.pbackupDirArray.indexOf(set),1);
  }

  onLogSizeYes(){
    this.logSizeYes = true;
  }

  onLogSizeNo(){
    this.logSizeNo = true;
  }

  oneMailReportYes(){
    this.eMailReportYes = true;
  }

  oneMailReportNo(){
    this.eMailReportNo = true;
  }

  oneMailSummaryYes(){
    this.eMailSummaryYes = true;
  }

  oneMailSummaryNo(){
    this.eMailSummaryNo = true;
  }

  onS3SyncYes(){
    this.s3SyncYes = true;
  }

  onS3SyncNo(){
    this.s3SyncNo = true;
  }

  onAWSSyncYes(){
    this.awsSyncYes = true;
    this.frontEndCLISelection = 'awscli';
  }

  onAWSSyncNo(){
    this.awsSyncNo = true;
  }

  ons3cmdYes(){
    this.s3cmdYes = true;
    this.frontEndCLISelection = 's3cmd';
  }

  ons3cmdNo(){
    this.s3cmdNo = true;
  }

  onsevenzipSelection(){
    this.sevenzipSelection = true;
    this.compressSelection = '7z';
  }

  ongzipSelection(){
    this.gzipSelection = true;
    this.compressSelection = 'gzip';
  }

  onReset1(){
    this.onAdd3 = false;
    this.pbackupName = "";
    this.pbackupDir = "";
    this.pbackupNameArray = [];
    this.pbackupDirArray = [];
    this.onAdd2 = false;
    this.mbackupName = "";
    this.mbackupDir = "";
    this.mbackupNameArray = [];
    this.mbackupDirArray = [];
    this.onAdd1 = false;
    this.backupName = "";
    this.backupDir = "";
    this.backupNameArray = [];
    this.backupDirArray = [];
    this.hidden = false;
    this.root = "";
    this.onAdd1 = false;
    this.onAdd2 = false;
    this.onAdd3 = false;
    this.hostname = "";
    this.logFileName = "";
    this.logFilePath = "";
    this.tmpFolderPath = "";
    this.logSizeYes = false;
    this.logSizeNo = false;
    this.eMailReportYes = false;
    this.eMailReportNo = false;
    this.eMailSummaryYes = false;
    this.eMailSummaryNo = false;
    this.msqlUser = "";
    this.msqlPass = "";
    this.psqlUser = "";
    this.psqlPass = "";
    this.compressPass = "";
    this.compressNo = false;
    this.daysRotation = "";
    this.s3SyncYes = false;
    this.s3SyncNo = false;
    this.bucketPath = "";
    this.trickleDownload = "";
    this.trickleUpload = "";
    this.fileBackup = false;
    this.mdbBackup = false;
    this.pdbBackup = false;
    this.compress = false;
    this.advancedOpt = false;
    this.awsSyncYes = false;
    this.awsSyncNo = false;
    this.gzipSelection = false;
    this.sevenzipSelection = false;
    this.compressSelection = "";
    this.s3cmdYes = false;
    this.s3cmdNo = false;
    this.frontEndCLISelection = "";
  }

  onSubmit(){
    let json = {
      "root": this.root,
      "hostname": this.hostname,
      "logFilePath": this.logFilePath,
      "logFileName": this.logFileName,
      "tmp_path": this.tmpFolderPath,
      "logFileSize": this.logSizeYes,
      "emailReport": this.eMailReportYes,
      "emailSummary": this.eMailSummaryYes,
      "fileSelection": this.fileBackup,
      "processName": this.backupNameArray,
      "fileBackupDirectory": this.backupDirArray,
      "mdbSelection": this.mdbBackup,
      "mysqlUser": this.msqlUser,
      "mysqlPass": this.msqlPass,
      "mdatabaseName": this.mbackupNameArray,
      "mdatabaseDirectory": this.mbackupDirArray,
      "pdbSelection": this.pdbBackup,
      "psqlUser": this.psqlUser,
      "psqlPass": this.psqlPass,
      "pdatabaseName": this.pbackupNameArray,
      "pdatabaseDirectory": this.pbackupDirArray,
      "compressSelection": this.compressSelection,
      "compressPass": this.compressPass,
      "daysRotation": this.daysRotation,
      "s3SyncSelection": this.s3SyncYes,
      "awsSyncSelection": this.awsSyncYes,
      "bucketPath": this.bucketPath,
      "trickleDownload": this.trickleDownload,
      "trickleUpload": this.trickleUpload,
      "frontEndCLISelection": this.frontEndCLISelection
    };
    console.log(json);
    this.http.post('http://localhost:8000/api/writeConf', json).subscribe(
      data => {
        console.log("Post request is Successful", data);
      }, error => {
        console.log(error);
      }
    );
    /*json.push({"id": "50"});
    json.push({"id": "60"});
    console.log(json);
    console.log("Form Submitted");*/
  }

}
