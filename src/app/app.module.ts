import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
// tslint:disable-next-line:max-line-length
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDatepicker,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { OrdersComponent } from './orders/orders.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { OrdersService } from './services/orders.service';
import { OrderEditorComponent } from './order-editor/order-editor.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MachinesComponent } from './settings/machines/machines.component';
import { ProductsComponent } from './settings/products/products.component';
import { OtherComponent } from './settings/other/other.component';
import { MachineMasterComponent } from './settings/machines/machine-master/machine-master.component';
import { MachineDetailComponent } from './settings/machines/machine-detail/machine-detail.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MachinesService } from './services/machines.service';
import { MachineEditorComponent } from './settings/machines/machine-editor/machine-editor.component';
import { UsersComponent } from './settings/users/users.component';
import { ProductsMasterComponent } from './settings/products/products-master/products-master.component';
import { ProductsDetailComponent } from './settings/products/products-detail/products-detail.component';
import { CustomersComponent } from './settings/customers/customers.component';
import { ProductEditorComponent } from './settings/products/product-editor/product-editor.component';
import { WorkflowComponent } from './settings/workflow/workflow.component';
import { InlineEditComponent } from './inline-edit/inline-edit.component';

import { SatPopoverModule } from '@ncstate/sat-popover';
import { PhonePipe } from './phone.pipe';
import { OrderCountTileComponent } from './dashboard/order-count-tile/order-count-tile.component';

// import { NgxDnDModule } from '@swimlane/dragula';

// import { DndModule } from '@beyerleinf/ngx-dnd';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    SettingsComponent,
    OrdersComponent,
    OrderEditorComponent,
    MachinesComponent,
    ProductsComponent,
    OtherComponent,
    MachineMasterComponent,
    MachineDetailComponent,
    MachineEditorComponent,
    UsersComponent,
    ProductsMasterComponent,
    ProductsDetailComponent,
    CustomersComponent,
    ProductEditorComponent,
    WorkflowComponent,
    InlineEditComponent,
    PhonePipe,
    OrderCountTileComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    DragDropModule,
    MatChipsModule,
    MatSelectModule,
    SatPopoverModule
  ],
  providers: [OrdersService, MachinesService, MatDatepicker],
  bootstrap: [AppComponent],
  entryComponents: [
    OrderEditorComponent,
    MachineEditorComponent,
    ProductEditorComponent
  ]
})
export class AppModule {}
