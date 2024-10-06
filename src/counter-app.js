import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "Counter";
    this.min = 20;
    this.count = this.min;
    this.max = 25;
    this.fancy=false;
    this.strobe = false;
  }

  static get properties() {
    return {
      title: { type: String },
      count: { type: Number },
      min: { type: Number },
      max: { type: Number },
      fancy: { type: Boolean, reflect: true } ,
      strobe: { type: Boolean, reflect: true } ,
    }
  };

  increaseCount(){
    this.count+=1;
  }
  decreaseCount(){
    this.count-=1;
    console.log(this.min, this.count)
  }
  updated(e){
    if(this.count === 21){
      this.strobe = true;
      this.fancy = true;
      this.makeItRain();
    } else{
      this.strobe = false;
      this.fancy =false;
    }
  }
  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }




  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        color: black;
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-l));
        
      }
      div, h1 {
        padding: 0;
        margin: 0;
      }
      .counter-wrapper {
        padding: var(--ddd-spacing-10);
        background-color: var(--ddd-theme-default-white);
        display: flex;
        gap: var(--ddd-spacing-4);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: var(--ddd-border-lg);
        border-color: var(--ddd-theme-default-beaverBlue);
      }
 
      .confetti-wrapper{
        padding: var(--ddd-spacing-4);
        width: 400px;
      }

      .count{
        font-size: 128px;
        
      }

      :host([fancy]) .count{
        color: blue;
      }

      .count-buttons button{
        width:100px;
        height: 100px;
        /* margin: 16px; */
        font-size: 24px; 
        background-color: var(--ddd-theme-default-beaverBlue);
        color: white;
        font-size: var(--ddd-font-size-l);
      }
      .count-buttons button:hover{
        cursor:pointer;
        background-color: var(--ddd-theme-default-beaver80);
        
      }
      .count-buttons button:disabled{
        cursor:default;
        background-color: var(--ddd-theme-default-navy40);
        
      }
      :host([strobe]) .counter-wrapper{
        color: red;
        -webkit-animation: raveOn 0.1s infinite;
      }

      @-webkit-keyframes raveOn{
        0%{
          opacity: 1;
        }
        100%{
          opacity: 0;
      }
}
      

    `];
  }

  render() {
    return html`
    <div class="confetti-wrapper">
      <confetti-container id="confetti">
        <div class="counter-wrapper">

          <div>${this.title}</div>
          <h1 class="count">${this.count}</h1>
          <div class="count-buttons">
            <button @click="${this.decreaseCount}" ?disabled="${this.min === this.count}">-</button>
            <button @click="${this.increaseCount}" ?disabled="${this.max === this.count}">+</button>
          </div>
          <slot></slot>
        </div>
       </confetti-container>
    </div>


  `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);