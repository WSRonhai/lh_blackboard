import './style.css'

class Blackboard {
  constructor(
    public el = document.querySelector<HTMLCanvasElement>('#canvas')!,
    private app = el.getContext('2d')!,
    private width: number = el.width,
    private height: number = el.height,
    private btns: HTMLDivElement = document.createElement('div'),
    private bgColor: string = '#000',
    private lineColor: string = '#fff',
  ) {
    this.inintCanvas()
    this.bindEvent()

  }

  private bindEvent() {
    const callback = this.drawLine.bind(this)
    this.el.addEventListener('mousedown', () => {
      this.app.beginPath()
      this.app.strokeStyle = this.lineColor
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
    this.app.fillStyle = this.bgColor
    this.app.fillRect(0, 0, this.width, this.height)
    this.el.insertAdjacentElement('afterend', this.btns)
  }
  //设置背景色
  public setBgColor(color: string) {
    this.bgColor = color
    this.app.fillStyle = color
    this.app.fillRect(0, 0, this.el.width, this.el.height)
    return this
  }
  //清屏
  public clear() {
    this.btns.classList.add('clearBtn')
    const clearBtn = document.createElement('button')
    clearBtn.innerText = "清屏"
    clearBtn.classList.add('btn')
    this.btns.insertAdjacentElement('afterbegin', clearBtn)
    clearBtn.addEventListener('click', () => {
      this.app.fillStyle = this.bgColor
      this.app.fillRect(0, 0, this.el.width, this.el.height)
    })
    return this
  }
  //设置笔的颜色
  public setLineColor() {
    const colors = ['#8e44ad', '#16a085', '#c0392b', '#16a085', '#bdc3c7']
    const container = document.createElement('div')
    container.classList.add('c-btns')
    colors.forEach(color => {
      const div = document.createElement('div')
      div.classList.add('c-btn')
      div.style.cssText = `width:50px;height:50px;text-align:center;line-height:50px;border-radius:5px;background-color:${color}`
      container.insertAdjacentElement('afterbegin', div)
      div.addEventListener('click', () => {
        this.lineColor = color
        this.app.lineWidth = 1
      })
    });
    this.btns.insertAdjacentElement('beforeend', container)
    return this
  }
  //橡皮擦
  public arese() {
    this.btns.classList.add('clearBtn')
    const btn = document.createElement('button')
    btn.innerText = "橡皮擦"
    btn.classList.add('btn')
    this.btns.insertAdjacentElement('afterbegin', btn)
    btn.addEventListener('click', () => {
      this.lineColor = this.bgColor
      this.app.lineWidth = 20
    })
    return this
  }
  //写字
  public draw() {
    this.btns.classList.add('clearBtn')
    const btn = document.createElement('button')
    btn.innerText = '画笔'
    btn.classList.add('btn')
    this.btns.insertAdjacentElement('afterbegin', btn)
    btn.addEventListener('click', () => {
      this.lineColor = '#fff'
      this.app.lineWidth = 1
    })
    return this
  }
  //截取图片
  public short() {
    this.btns.classList.add('clearBtn')
    const btn = document.createElement('button')
    btn.innerText = '截图'
    btn.classList.add('btn')
    this.btns.insertAdjacentElement('afterbegin', btn)
    const img = document.createElement('img')!
    btn.addEventListener('click', () => {
      img.src = this.el.toDataURL('image/jpeg')
      img.classList.add('img-short')
    })
    this.btns.insertAdjacentElement('afterend', img)
    return this
  }
}

const instance = new Blackboard()
instance.clear().setLineColor().arese().draw().short()