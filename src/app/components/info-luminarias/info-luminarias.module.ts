import { NgModule } from "@angular/core";
import { InfoLuminariasComponent } from "./info-luminarias.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@NgModule({
    declarations: [InfoLuminariasComponent],
    imports: [CommonModule, IonicModule],
    exports: [InfoLuminariasComponent]
})

export class InfoLuminariasModule {}