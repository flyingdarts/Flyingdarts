import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TweenMax } from 'gsap';
import { PlayerLocalStorageService } from '../../services/player.local-storage.service';
import { Subject } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
const { v4: uuidv4 } = require('uuid');
@Component({
  selector: 'app-x01',
  templateUrl: './x01.component.html',
  styleUrls: ['./x01.component.scss']
})
export class X01Component implements OnInit, OnDestroy {
  public inviteLink: string = ''
  public scoreActionButtonText = 'NO SCORE'
  public content = '';
  public input: string = ".";
  public currentInput: Number = 0;

  public player: Number[] = [];
  public player_name: string = "Player";
  public player_score: Number = 501;
  public player_avg: Number = 0;

  public opponent: Number[] = [];
  public opponent_name: string = "Opponent";
  public opponent_score: Number = 501;
  public opponent_avg: Number = 0;

  private trigger: Subject<void> = new Subject<void>();
  public webcamHeight = 300;
  public webcamWidth = 300;
  public webcamImage: any;
  public deviceId: String = "";

  constructor(
    private webSocketService: WebsocketService,
    private route: ActivatedRoute,
    private playerLocalStorageService: PlayerLocalStorageService) {
    webSocketService.messages.subscribe(msg => {
      console.log("Response from websocket");
      console.log(JSON.parse(msg.message));
      if (JSON.parse(msg.message).action == "x01/score-updated") {
        if (sessionStorage.getItem("playerId") == JSON.parse(msg.message).message.split('#')[0]) {
          this.player.push(JSON.parse(msg.message).message.split('#')[1]);
          this.player_score = Number(this.player_score) - Number(JSON.parse(msg.message).message.split('#')[1]);
          var sum: number = 0;
          for (var i = 0; i < this.player.length; i++) {
            sum = sum + Number(this.player[i])
          }
          console.log("Sum", sum);
          console.log("Length", this.player.length);
          this.player_avg = sum / this.player.length;

        } else {
          this.opponent.push(JSON.parse(msg.message).message.split('#')[1]);
          this.opponent_score = Number(this.opponent_score) - Number(JSON.parse(msg.message).message.split('#')[1]);
          var sum: number = 0;
          for (var i = 0; i < this.opponent.length; i++) {
            sum = sum + Number(this.opponent[i])
          }

          console.log("Sum", sum);
          console.log("Length", this.opponent.length);
          this.opponent_avg = sum / this.opponent.length;
        }
      }
    })
  }

  async ngOnInit(): Promise<void> {
    this.createSVG();
    this.showDartBoard(this.boardElemArray());
    const targets = document.getElementsByClassName("target");
    for (var i = 0; i < targets.length; i++) {
      targets[i].addEventListener("click", this.showScore);
    }
    this.player_name = this.playerLocalStorageService.getUserName();
    var view = document.getElementById("webcamView");
    this.webcamHeight = view?.clientHeight!;
    this.webcamWidth = view?.clientWidth!;
  }
  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log("active device: " + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable() {
    console.log();
    return this.trigger.asObservable();
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    if (
      error.mediaStreamError &&
      error.mediaStreamError.name === "NotAllowedError"
    ) {
      console.warn("Camera access was not allowed by user!");
    }
  }
  createPointArray() {
    const angle = this.convertToRad(4.5);
    let array = [];
    const pOne = [700, 700];
    array.push(pOne);
    this.DeterminePoint(angle, array, 300);
    this.DeterminePoint(angle, array, 350);
    this.DeterminePoint(angle, array, 550);
    this.DeterminePoint(angle, array, 600);
    this.DeterminePoint(angle, array, 625);
    return array;
  }

  convertToRad(num: any) {
    return Math.PI * num / 180;
  }

  DeterminePoint(angle: any, array: any, height: any) {
    for (var i = 0; i < 2; i++) {
      let point = [];
      let y = 2 * height * Math.sin(angle) * Math.sin(angle);
      let x = 2 * height * Math.sin(angle) * Math.cos(angle);
      i === 0
        ? (point = [700 + x, 700 - height + y])
        : (point = [700 - x, 700 - height + y]);
      array.push(point);
    }
  }

  createSVG() {
    const points = this.createPointArray();
    const svg = this.addAttributes("svg", [
      ["viewBox", "0 0 1400 1400"],
      ["width", "600"],
      ["id", "dartboard"]
    ]);
    const zero = this.addAttributes("circle", [
      ["cx", "700"],
      ["cy", "700"],
      ["r", "700"],
      ["fill", "black"],
      ["id", "zero"],
      ["value", 0]
    ]);
    zero.classList.add("target");
    const text = this.addAttributes("text", []);
    const numbers = [
      20,
      17,
      2,
      15,
      10,
      6,
      13,
      4,
      18,
      1,
      3,
      19,
      7,
      16,
      8,
      11,
      14,
      9,
      12,
      5
    ];
    svg.appendChild(zero);
    let color;
    let paths = [
      `M${points[0][0]},${points[0][1]}L${points[1][0]},${points[1][1]
      }A300 300 0 0 0 ${points[2][0]},${points[2][1]}Z`,
      `M${points[2][0]},${points[2][1]}A300 300 0 0 1 ${points[1][0]},${points[1][1]
      }L${points[3][0]},${points[3][1]}A350 350 0 0 0 ${points[4][0]},${points[4][1]
      }Z`,
      `M${points[4][0]},${points[4][1]}A350 350 0 0 1 ${points[3][0]},${points[3][1]
      }L${points[5][0]},${points[5][1]}A550 550 0 0 0 ${points[6][0]},${points[6][1]
      }Z`,
      `M${points[6][0]},${points[6][1]}A550 550 0 0 1 ${points[5][0]},${points[5][1]
      }L${points[7][0]},${points[7][1]}A600 600 0 0 0 ${points[8][0]},${points[8][1]
      }Z`,
      `M${points[10][0]},${points[10][1]}A625 625 0 0 1${points[9][0]},${points[9][1]
      }`
    ];
    let classes = ["inner", "triple", "outer", "double", "number"];
    for (var j = 0; j < 20; j++) {
      for (var i = 0; i < 5; i++) {
        color =
          i === 4
            ? "transparent"
            : i % 2 === 0 && j % 2 === 0
              ? "black"
              : i % 2 !== 0 && j % 2 === 0
                ? "red"
                : i % 2 === 0 && j !== 0 ? "beige" : "green";
        const path = this.addAttributes("path", [
          ["d", paths[i]],
          ["class", classes[i]],
          ["fill", color],
          ["value", numbers[j]]
        ]);
        if (i === 4) {
          path.setAttribute("id", `text${j}`);
          path.style.opacity = "1";
          const textP = this.addAttributes("textPath", [
            ["href", `#text${j}`],
            ["class", "elem"],
            ["startOffset", "50%"],
            ["text-anchor", "middle"]
          ]);
          textP.innerHTML = numbers[j];
          text.appendChild(textP);
        } else {
          path.classList.add("target");
        }
        svg.appendChild(path);
      }
    }
    svg.appendChild(text);
    const bull = this.addAttributes("circle", [
      ["cx", "700"],
      ["cy", "700"],
      ["r", "30"],
      ["fill", "red"],
      ["class", "target"],
      ["id", "dbull"],
      ["value", 50]
    ]);
    const sbull = this.addAttributes("circle", [
      ["cx", "700"],
      ["cy", "700"],
      ["r", "60"],
      ["fill", "green"],
      ["class", "target"],
      ["id", "sbull"],
      ["value", 25]
    ]);
    svg.appendChild(sbull);
    svg.appendChild(bull);
    document.getElementById("wrapper")!.appendChild(svg);
  }

  boardElemArray() {
    const a = document.getElementsByClassName("inner");
    const b = document.getElementsByClassName("triple");
    const c = document.getElementsByClassName("outer");
    const d = document.getElementsByClassName("double");
    const z = document.getElementsByClassName("number");
    return [a, b, c, d, z];
  }

  showDartBoard(array: any) {
    TweenMax.to("#dbull", 1, { opacity: 1 });
    TweenMax.to("#sbull", 2, { opacity: 1 });
    for (var i = 0; i < array.length; i++) {
      const item = array[i];
      const bb = item[0].getBBox();
      const to = `${700 - bb.x} ${700 - bb.y}`;
      setTimeout(
        () => {
          this.animationBoard(item, to);
        },
        i * 400,
        item,
        to
      );
    }
    TweenMax.to("#zero", 1, { opacity: 1, delay: 6 });
  }

  animationBoard(d: any, to: string) {
    TweenMax.to(d[10], 1, { rotation: 180, transformOrigin: to, opacity: 1 });
    for (var i = 1; i < 10; i++) {
      TweenMax.to(d[i], 1, {
        rotation: 180 - 18 * i,
        transformOrigin: to,
        opacity: 1,
        delay: 0.5 * i
      });
      TweenMax.to(d[i + 10], 1, {
        rotation: -180 + 18 * i,
        transformOrigin: to,
        opacity: 1,
        delay: 0.5 * i
      });
    }
    TweenMax.to(d[0], 1, {
      rotation: 0,
      transformOrigin: to,
      opacity: 1,
      delay: 5
    });
  }

  addAttributes(elem: any, array: any) {
    const item = document.createElementNS("http://www.w3.org/2000/svg", elem);
    for (var l = 0; l < array.length; l++) {
      item.setAttribute(array[l][0], array[l][1]);
    }
    return item;
  }

  showScore(e: any) {
    let amount = e.target.getAttribute("value");
    e.target.classList.contains("double")
      ? (amount = 2 * amount)
      : e.target.classList.contains("triple")
        ? (amount = 3 * amount)
        : (amount = amount);
    console.log(parseFloat(amount));

    this.input = `${this.input}${parseFloat(amount)}`;
  }

  ngOnDestroy(): void {
    window.removeEventListener("scroll", () => { });
  }
  sendScore(input?: number) {
    if (input! >= 0 && input! <= 9) {
      this.currentInput = Number(`${this.currentInput}${input!} `)
      this.scoreActionButtonText = 'OK';
      return
    }
    let body = {
      action: 'x01/score',
      message: `${this.route.snapshot.params["roomId"]} #${sessionStorage.getItem('playerId')} #${this.player_score} #${input} `
    }
    this.webSocketService.messages.next(body)
  }

  clearInput() {
    this.currentInput = 0;
    this.scoreActionButtonText = "NO SCORE";
  }

  scoreAction() {
    this.sendScore(Number(this.currentInput));
    this.currentInput = 0;
    this.scoreActionButtonText = "NO SCORE"
  }


}

