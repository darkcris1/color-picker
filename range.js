;(function (root, factory) {
  if (typeof define === 'object' && define.amd) {
    define(factory())
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.range = factory()
  }
})(window || this, function () {
  const eachObj = function (obj, callback) {
    let j = -1
    const properties__ = Object.entries(obj)
    properties__.forEach((property) => {
      for (let i = 0; i < property.length; i++) {
        callback(property[i], property[i + 1], ++j, this)
        break
      }
    })
  }
  function Range() {
    this.create = function (selector, option) {
      option = option || {}
      option.height = option.height || '5px'
      option.progressColor = option.progressColor || 'lightblue'
      option.width = option.width || '100%'
      option.thumb = option.thumb || {}
      option.thumb.hover = option.thumb.hover || {}
      option.thumb.height = option.thumb.height || '20px'
      option.trackColor = option.trackColor || 'lightgrey'
      const { width, height, background, trackColor, progressColor } = option
      function unitRemover(x) {
        return parseFloat(x.replace(/px|rem|em/, ''))
      }
      const marginTop =
        unitRemover(height) / 2 - unitRemover(option.thumb.height) / 2 + 'px'
      // Elements
      const ranges =
        selector instanceof Element
          ? selector
          : document.querySelectorAll(selector)
      const styles = document.createElement('style')
      // Styles
      const stylesConcat1 = `input[type=range]${selector}{ width:${width};-webkit-appearance:none;-webkit-tap-highlight-color:transparent;}`
      const stylesConcat2 = `input[type=range]${selector}:focus{outline:none}input[type=range]::ms-track{width: ${width};height:${height};border-color:transparent;background:transparent;color:transparent}`
      const stylesConcat3 = `input[type=range]${selector}::-webkit-slider-runnable-track{-webkit-appearance:none;}`
      const stylesConcat4 = `input[type=range]${selector}::-webkit-slider-thumb{-webkit-appearance:none;margin-top:${marginTop}}`
      let rangeStyles =
        stylesConcat1 + stylesConcat2 + stylesConcat3 + stylesConcat4
      document.head.appendChild(styles)

      function checkProps(propss) {
        if (/([^\-])([A-Z])/g.test(propss)) {
          propss = propss.replace(/[A-Z]/g, (x) => '-' + x.toLowerCase())
        } else {
          propss = propss.toLowerCase()
        }
        return propss
      }
      function compatibility() {
        const thumbVendors = ['-webkit-slider-thumb', '-moz-range-thumb']
        const trackVendors = [
          '::-webkit-slider-runnable-track',
          '::-moz-range-track',
          '',
        ]
        thumbVendors.forEach((thumbVendor) => {
          let thumbV = `input[type=range]${selector}::${thumbVendor}{border:none;transition:box-shadow 300ms;border-radius:10px;width:20px; background:lightblue;`
          let thumbHover = `input[type=range]${selector}::${thumbVendor}:hover{box-shadow:0 0 0 10px #add8e679;`
          eachObj(option.thumb, (props, value, i) => {
            const hyphenprop = checkProps(props)
            if (value instanceof Object) {
              return
            }
            thumbV += `${hyphenprop}:${value};`
          })
          eachObj(option.thumb.hover, (props, value) => {
            const hyphenprop = checkProps(props)
            thumbHover += `${hyphenprop}:${value};`
          })
          rangeStyles += thumbV + '} ' + thumbHover + '}'
        })
        const regex = /background(-image|-color|)|track-color|progress-color/
        trackVendors.forEach((trackVendor) => {
          let trackV = `input[type=range]${selector}${trackVendor}{background:transparent; border-radius: 5px;`
          eachObj(option, (props, value) => {
            const hyphenprop = checkProps(props)
            if (regex.test(hyphenprop) || value instanceof Object) {
              return
            }
            trackV += `${hyphenprop}:${value};`
          })
          rangeStyles += trackV + '}'
        })
      }
      compatibility()
      styles.innerHTML += rangeStyles
      function progressBar() {
        const { min, max, value, style } = this,
          percent = (value - min) * (100 / (max - min)) + '%'
        style.backgroundImage = `linear-gradient(to right,${progressColor} ${percent},${trackColor} 0%)`
      }

      if (ranges instanceof HTMLCollection || ranges instanceof NodeList) {
        ranges.forEach((range) => {
          progressBar.apply(range)
          range.addEventListener('input', progressBar)
        })
      } else {
        progressBar.apply(range)
        ranges.addEventListener('input', progressBar)
      }
    }
  }
  return new Range()
})
