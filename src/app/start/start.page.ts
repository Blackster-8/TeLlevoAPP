import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController, NavController, createAnimation } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage {

  constructor(private anim: AnimationController, private nav: NavController) { }


  ngOnInit() {
    this.animarLogo()
  }

  async animarLogo() {
    let elemento = document.querySelector("#logo")
    await this.anim.create().addElement(elemento!)
      .duration(1000)
      .fromTo('opacity', 0, 1)
      .fromTo('filter', 'grayscale(1)', 'grayscale(0)')
      .onFinish(() => {
        this.anim.create().addElement(elemento!)
          .delay(3000)
          .duration(1000)
          .fromTo('opacity', 1, 0)
          .onFinish(() => {
            this.nav.navigateForward("login")
          })
          .play()

      })
      .play()
  }

}

