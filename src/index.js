import './style.css'
import imageAsset from './Image_created_with_a_mobile_phone.png'
import './index.html'

const func = (arg1,...args) => {
    args.forEach(e => console.log(e + arg1))
}

const img = document.createElement('img')
img.src = imageAsset
img.width = 200
img.alt = 'pic'
document.append(img)

func(1,2,3)