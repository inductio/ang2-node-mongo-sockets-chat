import { NgModule, Component } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import 'rxjs/add/operator/map';
import { default as Greeter } from './services';

@Component({
  selector: 'hello',
  template: '<p>{{ message }}</p>',
})

export class Hello {
  constructor(greeter:Greeter) {
    this.message = greeter.say('hello', 'Angular 2');
  }
}

@Component({
  selector: 'Bye',
  template: '<p>{{ message$ | async }}</p>',
})

export class Bye {
  constructor(greeter:Greeter, route:ActivatedRoute) {
    this.message$ = route.params
        .map(params => greeter.say('Bye', params.name));
  }
}

@Component({
  selector: 'hello-app',
  template: `
  <ul>
    <li><a [routerLink]="['/']">Hello</a></li>
    <li><a [routerLink]="['/bye', 'ng2']">Bye</a></li>
  </ul>
  <router-outlet></router-outlet>
  `,
})

export class HelloApp {
}

const routing = RouterModule.forRoot([
  { path: '', component: Hello },
  { path: 'bye/:name', component: Bye },
]);

@NgModule({
  imports: [
    BrowserModule,
    routing,
  ],
  declarations: [
    HelloApp,
    Hello,
    Bye,
  ],
  providers: [
    Greeter,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [HelloApp],
})
export class AppModule {
}
