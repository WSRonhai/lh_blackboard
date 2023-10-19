import './style.css'

class Blackboard {
  constructor(
    public el = document.querySelector<HTMLCanvasElement>('#canvas')!,
    private app = el.getContext('2d')!,
    private width: number = el.width,
    private height: number = el.height,
  ) {
    this.inintCanvas()
    this.bindEvent()
  }

  private bindEvent() {
    const callback = this.drawLine.bind(this)
    this.el.addEventListener('mousedown', () => {
      this.app.beginPath()
      this.app.strokeStyle = '#fff'
      this.el.addEventListener('mousemove', callback)
      this.el.addEventListener('mouseup', () => {
        this.el.removeEventListener('mousemove', callback)
      })
    })

  }
  private drawLine(event: MouseEvent) {
    this.app.lineTo(event.offsetX, event.offsetY)
    this.app.stroke()
  }
  private inintCanvas() {
    this.app.fillStyle = '#000'
    this.app.fillRect(0, 0, this.width, this.height)
  }

}

const instance = new Blackboard()