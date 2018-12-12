const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
  // Pass to next layer of middleware
});

app.listen(8000, () => {
  console.log("Server Started");
});

app.post('/api/writeConf', (req, res) => {
  const json = req.body;
  let rootDirectory = json.root,
      hostname = json.hostname,
      logFilePath = json.logFilePath,
      logFileName = json.logFileName,
      tmp_path = json.tmp_path,
      logFileSize = json.logFileSize ? 1 : 0,
      emailReport = json.emailReport ? 1: 0,
      emailSummary = json.emailSummary ? 1: 0,
      fileSelection = json.fileSelection,
      processName = json.processName,
      fileBackupDirectory = json.fileBackupDirectory,
      mdbSelection = json.mdbSelection,
      mysqlUser = json.mysqlUser,
      mysqlPass = json.mysqlPass,
      mdatabaseName = json.mdatabaseName,
      mdatabaseDirectory = json.mdatabaseDirectory,
      pdbSelection = json.pdbSelection,
      psqlUser = json.psqlUser,
      psqlPass = json.psqlPass,
      pdatabaseName = json.pdatabaseName,
      pdatabaseDirectory = json.pdatabaseDirectory,
      compressSelection = json.compressSelection,
      compressPass = json.compressPass,
      daysRotation = json.daysRotation,
      s3SyncSelection = json.s3SyncSelection ? 1: 0,
      awsSyncSelection = json.awsSyncSelection ? 1: 0,
      bucketPath = json.bucketPath,
      trickleDownload = json.trickleDownload,
      frontEndCLISelection = json.frontEndCLISelection,
      trickleUpload = json.trickleUpload;

  //console.log(pdatabaseName.length);

  fs.unlink('global.conf', function(err){
    if(err) throw err;
    fs.unlink('backup.conf', function(err){
      if(err) throw err;
        fs.open('global.conf', 'w', function(err){
          if(err) throw err;
          //console.log("Saved");
          fs.appendFile('global.conf', '#-------------------------------------------------------------------------------\n' +
          '\n#-------------------------------------------------------------------------------\n', function(err){
          if(err) throw err;
         // console.log("Saved");
         fs.appendFile('global.conf', '# where to backup --------------------------------------------------------------\n' +
         '\nbackuproot=' + rootDirectory + '\n' +
         '\n# host name --------------------------------------------------------------------' + '\n' +
         '\nhostname=' + hostname + '\n' +
         '\n# logs -------------------------------------------------------------------------' + '\n' +
         '\nlogfilepath=' + logFilePath + '\n' + '\nlogfilename=' + logFileName + '\n' + '\ntmp_path=' + tmp_path + '\n' +
         '\nlog_top_separator=################################################################################' + '\n' +
         '\nlog_separator=--------------------------------------------------------------------------------' + '\n' +
         '\n# logs extra -------------------------------------------------------------------' + '\n' +
         '\nlog_filesize=' + logFileSize + '\n' +
         '\nexport_session_log_to=\n' + '# Errors -------------------------------------------------------------\n' +
         '\nreport_errors=' + emailReport + '\n' + '\ndisable_report_summary=' + emailSummary + '\n' +
         '\nexport_errors_to=\n' + '\n# tar options ------------------------------------------------------------------\n' +
         '\ntar_options_backup_list=cpf\n' + '\ntar_options_backup_file=cpf\n' +
         '\n# MySQL ------------------------------------------------------------------------\n' +
         '\nmysql_user=' + mysqlUser + '\n' +
         '\nmysql_password=' + mysqlPass + '\n' +
         '\n# Postgresql ------------------------------------------------------------------------\n' +
         '\npg_user=' + psqlUser + '\n' +
         '\npg_password=' + psqlPass + '\n' +
         '\n# compression--------------------------------------------------------------------\n' +
         'use_compression=' + compressSelection + '\n' +
         '\n# 7z compression and AES encryption (STRONGLY RECOMMENDED) -------------------------\n' +
         '\npasswd_7z=' + compressPass + '\n' +
         '\n# one of \'7z\' or \'zip\'. Othe#----------------------------------r types will be ignored.\n' +
         '\nfiletype_7z=7z\n' +
         '\n# rotating delete --------------------------------------------------------------\n' +
         '\ndays_rotation=' + daysRotation + '\n' +
         '\nmin_backups_in_rotation_period=7\n' +
         '\n# Amazon S3 --------------------------------------------------------------------\n' +
         '\ns3_sync=' + s3SyncSelection + '\n' +
         '\ns3_path=s3://' + bucketPath + '/\n' +
         '\n# Amazon AWS front end: awscli OR s3cmd ----------------------------------------\n' +
         '\namazon_front_end=' + frontEndCLISelection + '\n' +
         '\nawscli_params=--sse AES256\n' +
         '\ns3cmd_sync_params=--verbose --config /root/.s3cfg --delete-removed --server-side-encryption\n' +
         '\n# ATTENTION --------------------------------------------------------------------\n' +
         '\n# s3cmd versions < 0.9 ---------------------------------------------------------\n' +
         '\n# s3cmd latest version ---------------------------------------------------------\n' +
         '\nnice_params=-n19\n' +
         '\nionice_params=-c2 -n7' +
         '\ntrickle_params=-s -u ' + trickleUpload + ' -d ' + trickleDownload + '\n' +
         '\n# Send mail report -------------------------------------------------------------\n' +
         '\nmail_to=\n' +
         '\ncat_params_in_mail_command=-v\n' +
         '\nmail_only_summary=0\n' +
         '\n# ##############################################################################\n' +
         '\n# END\n' +
         '\n# ##############################################################################',
         function(err){
         if(err) throw err;
         //console.log("Saved");
         fs.open('backup.conf', 'w', function(err){
          if(err) throw err;
          console.log("Saved1");
          fs.appendFile('backup.conf', '#-------------------------------------------------------------------------------\n' +
          '\n#-------------------------------------------------------------------------------\n',function(err){
          if(err) throw err;
          console.log("Saved2");
          if(fileSelection){
            for(let i = 0; i < processName.length; i++){
              fs.appendFile('backup.conf', '\n# pause backup after three sessions --------------------------------------------\n' +
                '[' + processName[i] + ']\n' +
                'type=files\n' +
                'path=' + processName[i] + '\n' +
                'prefix=' + processName[i] + '\n' +
                'fileset=' + fileBackupDirectory[i] + '\n' +
                'delimiter=,\n' +
                'starting_message='+ processName[i] + ' backup is starting...\n' +
                'finish_message=' + processName[i] + ' backup completed.\n' +
                '#skip_after=3\n' +
                'number_of_files_per_backup=1\n' +
                '#skip_message=' + processName[i] + ' backup is paused.\n',
                function(err){
                  if(err) throw err;
                  console.log("SavedFiles");
                });
            }
          }
          if(pdbSelection){
            for(let i = 0; i < pdatabaseName.length; i++) {
              fs.appendFile('backup.conf', '\n#Postgresql database ----------------------------------------------------------\n' +
                '[' + pdatabaseName[i] + ']\n' +
                'type=postgresql\n' +
                'path=postgresql/' + pdatabaseDirectory[i] + "\n" +
                'prefix=' + pdatabaseName[i] + '\n' +
                'database=' + pdatabaseName[i] + '\n' +
                'starting_message=' + pdatabaseName[i] + ' Postgresql database backup is starting...\n' +
                'finish_message=' + pdatabaseName[i] + ' Postgresql database backup completed.\n',
                function (err) {
                  if (err) throw err;
                  console.log("SavedPDB");
                });
            }
          }
          if(mdbSelection){
            for(let i = 0; i < mdatabaseName.length; i++){
              fs.appendFile('backup.conf', '\n#MySQL database ----------------------------------------------------------\n' +
                '[' + mdatabaseName[i] + ']\n' +
                'type=mysql\n' +
                'path=' + mdatabaseDirectory[i] + "\n" +
                'prefix=' + mdatabaseName[i] + '\n' +
                'database=' + mdatabaseName[i] + '\n' +
                'starting_message=' + mdatabaseName[i] + ' mysql database backup is starting...\n' +
                'finish_message=' + mdatabaseName[i] + ' mysql database backup completed.\n',
                function(err){
                  if(err) throw err;
                  console.log("SavedMDB");
                });
            }
          }
          res.status(200).json({});
        });
        });
       });
        });
        });
    });
  });
});

app.get('/', (req, res) => {
  res.sendStatus(200);
});
