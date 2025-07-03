import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { LandingView } from "./landing-view/landing-view";

@Component({
  selector: 'app-root',
  imports: [Navbar, LandingView],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}