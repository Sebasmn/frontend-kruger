import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';

/**
 * Aqui se importan los componentes utilizados de
 * angular material
 */

const MaterialComponents = [
  MatButtonModule,
  MatFormFieldModule,
  MatCardModule,
  MatIconModule,
  ReactiveFormsModule,
  MatInputModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatPaginatorModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatRadioModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
  providers: [
    MatDatepickerModule,
  ],
})
export class MaterialModule {}
