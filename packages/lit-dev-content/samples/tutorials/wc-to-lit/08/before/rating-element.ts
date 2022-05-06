export class RatingElement extends HTMLElement {
  private _rating = 0;
  private _vote: 'up'|'down'|null = null;

  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'});
    const templateContent = document.querySelector<HTMLTemplateElement>('#rating-element-template')!.content;
    const clonedContent = templateContent.cloneNode(true);
    shadowRoot.appendChild(clonedContent);

    this.shadowRoot!.querySelector<HTMLElement>('.rating')!.innerText = `${this.rating}`;
  }

  static observedAttributes = ['rating', 'vote'];

  attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string) {
    if (attributeName === 'rating') {
      const newRating = Number(newValue);

      this.rating = newRating;
    } else if (attributeName === 'vote') {
      this.vote = newValue as 'up'|'down';
    }
  }

  set rating(value: number) {
    this._rating = value;

    if (!this.shadowRoot) {
      return;
    }

    const ratingEl = this.shadowRoot.querySelector<HTMLElement>('.rating');

    if (ratingEl) {
      ratingEl.innerText = `${this._rating}`;
    }
  }

  get rating() {
    return this._rating;
  }

  set vote(newValue: 'up'|'down'|null) {
    const oldValue = this._vote;
    if (newValue === oldValue) {
      return;
    }

    if (newValue === 'up') {
      if (oldValue === 'down') {
        this.rating += 2;
      } else {
        this.rating += 1;
      }
    } else if (newValue === 'down') {
      if (oldValue === 'up') {
        this.rating -= 2;
      } else {
        this.rating -= 1;
      }
    }

    this._vote = newValue;
    this.setAttribute('vote', newValue!);
  }

  get vote() {
    return this._vote;
  }
 }

 customElements.define('rating-element', RatingElement);
