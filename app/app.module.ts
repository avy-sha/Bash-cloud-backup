import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { Ng2DropdownModule } from 'ng2-material-dropdown';
import { HttpClientModule} from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ViewComponentComponent } from './view-component/view-component.component';
import { HomeComponent } from './home/home.component';
import { BackupStorageConfigComponent } from './backup-storage-config/backup-storage-config.component';
import { InitComponent } from './init/init.component';
import { MatTableModule } from  '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';

const appRoutes = [
    {path: '', component: InitComponent},
    {path: 'view_component', component: ViewComponentComponent},
    {path: 'home_component', component: HomeComponent},
    {path: 'backup_storage_config', component: BackupStorageConfigComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    ViewComponentComponent,
    HomeComponent,
    BackupStorageConfigComponent,
    InitComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2DropdownModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatTableModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
