// 等待页面结构加载完毕后再调用
document.addEventListener('DOMContentLoaded', function () {
  initCrumbsNav()
  leftTabClick()
  bottomTabContent()
  rightPanelClick()
  rightMenu()
  initSmallPic()
  thumbImgClick()
  arrowClick()
  zoominit()
  renderGoodBaseInfo()
  goodsSizeInit()
  goodsSizeClick()
  ShoppingDoodsPrice()
  inputCheckedclick()
})

//1.初始化面包屑导航栏
function initCrumbsNav() {
  let paths = goodData.path
  paths.forEach(function (path, index) {
    //获取一个创造的a节点
    var aNode = document.createElement('a')
    //把a节点的文本内容替换成路径的title数据
    aNode.innerText = path.title
    //把除了下标是最后一个的a节点的路径变成path的url路径
    if (index !== paths.length - 1) {
      aNode.href = path.url
    }
    else {

    }
    //找到父节点conpoin
    var conPoin = document.querySelector('.wrap .con .conPoin')
    //追加到父节点后面
    conPoin.appendChild(aNode)
  })
}

// 2.给左边选修卡绑定单击切换事件
function leftTabClick() {
  // 找对应h4标签，循环绑定单击事件
  let h4Eles = document.querySelectorAll('.wrap .productDetail .aside .tabWrap h4')
  let divsEle = document.querySelectorAll('.wrap .productDetail .aside .tabContent > div')
  h4Eles.forEach(function (item, index) {
    item.addEventListener('click', function () {
      h4Eles.forEach(function (Nodes) {
        Nodes.classList.remove('active')
      })
      this.classList.add('active')
      divsEle.forEach(function (item) {
        item.classList.remove('active')

      })
      divsEle[index].classList.add('active')
    })

  })
}

// 3.给底部选项卡绑定单机切换事件
function bottomTabContent() {
  let liEles = document.querySelectorAll('.wrap .productDetail .detail .intro .tabWrap li')
  let TabContent = document.querySelectorAll('.wrap .productDetail .detail .intro .tabContent > div')
  liEles.forEach(function (item, index) {
    item.addEventListener('click', function () {
      liEles.forEach(function (Nodes) {
        Nodes.classList.remove('active')
      })
      this.classList.add('active')
      TabContent.forEach(function (item) {
        item.classList.remove('active')
        TabContent[index].classList.add('active')
      })
    })
  })
}

// 4. 给页面右侧面板绑定单击事件
function rightPanelClick() {
  let butEle = document.querySelector('.wrap .toolBar .but')
  let isclose = true
  butEle.onclick = function () {

    let toolBar = document.querySelector('.wrap .toolBar')
    if (isclose) {

      butEle.classList.replace('list', 'cross')
      toolBar.classList.replace('toolWrap', 'toolOut')
    } else {

      butEle.classList.replace('cross', 'list')
      toolBar.classList.replace('toolOut', 'toolWrap')
    }
    isclose = !isclose
  }
}

//5.右侧小菜单过度
function rightMenu() {
  let liEle = document.querySelectorAll('.wrap .toolBar .toolList li')
  // 循环绑定鼠标悬浮和离开
  liEle.forEach(function (liNode, index) {
    liNode.onmouseenter = function () {
      let iNode = this.querySelector('i')
      let emNode = this.querySelector('em')
      iNode.style.backgroundColor = 'rgb(200,17,34)'
      emNode.style.left = '-62px'
    }
    liNode.onmouseleave = function () {
      let iNode = this.querySelector('i')
      let emNode = this.querySelector('em')
      iNode.style.backgroundColor = 'rgb(122,110,110)'
      emNode.style.left = '35px'
    }
  })
}
//6
function initSmallPic() {

  let fristimgsrc = goodData.imgsrc[0].s

  let smallbox = document.querySelector('.wrap .con .mainCon .previewWrap .preview .zoom')
  let imgNode = new Image()

  imgNode.src = fristimgsrc
  // console.log(imgNode)
  smallbox.appendChild(imgNode)

  let allimg = goodData.imgsrc
  allimg.forEach(function (item) {
    let imgNode = new Image()
    imgNode.src = item.s
    let liNode = document.createElement('li')
    liNode.appendChild(imgNode)

    let listEle = document.querySelector('.wrap .con .mainCon .previewWrap .specScroll .itemCon .list')
    listEle.appendChild(liNode)
  })

}
//7.点击微缩图小图切换
var index = 0
function thumbImgClick() {

  let listEle = document.querySelectorAll('.wrap .con .mainCon .previewWrap .specScroll .itemCon .list > li')
  // console.log(listEle)
  listEle.forEach(function (liNode, i) {
    liNode.onclick = function () {

      index = i
      let imgNode =
        document.querySelector('.wrap .con .mainCon .previewWrap .preview .zoom img')
      console.log(imgNode);
      imgNode.src = goodData.imgsrc[i].s
    }
  })
}
//8.微缩图ul点击偏移
function arrowClick() {
  let rightarrow = document.querySelector('.wrap .con .mainCon .previewWrap .specScroll .prev')

  let leftarrow = document.querySelector('.wrap .con .mainCon .previewWrap .specScroll .next')

  let listEle = document.querySelectorAll('.wrap .con .mainCon .previewWrap .specScroll .itemCon .list > li')

  let ulEle = document.querySelector('.wrap .con .mainCon .previewWrap .specScroll .itemCon .list')
  // 默认ul最多放五张图片

  let Defaultquantity = 5
  //记录ul已经走过的偏移量
  let ulleft = 0
  //获取自身的宽度
  let listEleWidth = listEle[0].offsetWidth

  //获取自身的左右margin
  let listmargin = parseInt(window.getComputedStyle(listEle[0]).marginRight)

  //每次点击需要偏移的偏移量
  let ulstep = listmargin + listEleWidth

  //获取最大能偏移的偏移量
  let maxleft = (listEle.length - Defaultquantity) * ulstep

  //给左箭头绑定单机事件
  leftarrow.onclick = function () {
    //如果列表的总偏移量大于最大能偏移的量
    if (ulleft === maxleft) {
      //那就不执行
      return
    } else {
      ulleft += ulstep
      ulEle.style.left = -ulleft + 'px'
      // console.log(ulleft.style.left)
    }
  }
  rightarrow.onclick = function () {
    // console.log(1)
    if (ulleft === 0) {
      return
    } else {
      ulleft -= ulstep
      ulEle.style.left = -ulleft + 'px'
      // console.log(ulEle.style.left)
    }

  }
}

//9.放大镜
function zoominit() {
  // 0.获取小图容器节点
  var mask = null
  var bigimg = null
  var bigimgbox = null
  var smallimgbox = document.querySelector('.wrap .con .mainCon .previewWrap .preview .zoom')

  // 1.获取小图和大图容器的父节点
  let previewBox = document.querySelector('.wrap .con .mainCon .previewWrap .preview')
  // 2.在小图容器鼠标悬浮上去的时候
  smallimgbox.onmouseenter = function () {
    // 3.创建大图片和遮盖布和大图容器
    mask = document.createElement('div')
    //给遮盖布设置类名，
    mask.className = 'mask'

    //创造大图容器，并且给大图容器添加类名
    bigimgbox = document.createElement('div')
    bigimgbox.className = 'bigBox'

    bigimg = new Image()
    // 给大图片添加src属性
    bigimg.src = goodData.imgsrc[index].b
    //把遮盖布追加到小图容器
    smallimgbox.appendChild(mask)
    // 让大图片追加到大图容器
    bigimgbox.appendChild(bigimg)
    // 让大图容器追加到自己的父节点
    previewBox.appendChild(bigimgbox)
  }


  // .在鼠标离开的时候绑定事件
  smallimgbox.onmouseleave = function () {
    //.在小图容器删除遮盖布节点
    smallimgbox.removeChild(mask)
    //.删除大图容器
    previewBox.removeChild(bigimgbox)
    //鼠标离开小图容器的时候，不再引用遮盖布和大图片还有大图容器，所以需要销毁
    mask = bigimg = bigimgbox = null
  }


  smallimgbox.onmousemove = function (event) {

    var maskmoveleft = event.clientX - smallimgbox.getBoundingClientRect().left - mask.offsetWidth / 2
    var maskmovetop = event.clientY - smallimgbox.getBoundingClientRect().top - mask.offsetHeight / 2

    var maskmaxmovetop = smallimgbox.clientHeight - mask.offsetHeight
    var maskmaxmoveleft = smallimgbox.clientWidth - mask.offsetWidth



    if (maskmovetop > maskmaxmovetop) {

      maskmovetop = maskmaxmovetop
    } else if (maskmovetop < 0) {
      maskmovetop = 0
    }

    if (maskmoveleft > maskmaxmoveleft) {
      maskmoveleft = maskmaxmoveleft
    } else if (maskmoveleft < 0) {
      maskmoveleft = 0
    }
    mask.style.left = maskmoveleft + 'px'
    mask.style.top = maskmovetop + 'px'

    var bigimgmaxmoveleft = bigimg.clientWidth - bigimgbox.offsetWidth
    var bigimgmaxmovetop = bigimg.clientHeight - bigimgbox.offsetHeight
    var bigmoveleft = (bigimgmaxmoveleft * maskmoveleft) / maskmaxmoveleft
    var bigmovetop = (bigimgmaxmovetop * maskmovetop) / maskmaxmovetop
    bigimg.style.left = -bigmoveleft + 'px'
    bigimg.style.top = -bigmovetop + 'px'
  }
}


//10.商品的基本信息
function renderGoodBaseInfo() {
  //找到data文件下的数据定义一个变量
  let goodsDetail = goodData.goodsDetail
  //定义一个模板字符串
  let goodsinit = `<h3 class="infoName">
      ${goodsDetail.title}
    </h3>
    <p class="news">
      ${goodsDetail.recommend}
    </p>
    <div class="priceArea">
      <div class="priceArea1">
        <div class="title">
          价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
        </div>
        <div class="price">
          <i>￥</i>
          <em>${goodsDetail.price}</em>
          <span>降价通知</span>
        </div>
        <div class="remark">
          <i>累计评价</i>
          <span>${goodsDetail.evaluateNum}</span>
        </div>
      </div>
      <div class="priceArea2">
        <div class="title">
          促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销
        </div>
        <div class="fixWidth">
          <i>${goodsDetail.promoteSales.type}</i>
          <span
            ${goodsDetail.promoteSales.content}
          </span>
        </div>
      </div>
    </div>
    <div class="support">
      <div>
        <div class="title">
          支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
        </div>
        <div class="fixWidth">
          ${goodsDetail.support}
        </div>
      </div>
      <div>
        <div class="title">配&nbsp;送&nbsp;至</div>
        <div class="fixWidth">${goodsDetail.address}</div>
      </div>
    </div>`
  //找到需要穿插字符串的标签
  let info1 = document.querySelector('.wrap .con .mainCon .infoWrap .info1')
  //把商品信息模板字符串填入info1标签并且解析里面的标签内容
  info1.innerHTML = goodsinit

  //找到商品底部的价格数字标签
  let bottomprice = document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .master p')
  //找到商品信息的价格并且把文本填入p标签里面
  bottomprice.innerText = '¥' + goodsDetail.price
  //找到所有的复选框按钮
  let inputEle = document.querySelectorAll('.wrap .productDetail .detail .fitting .goodSuits .suits input')
  // console.log(inputEle)

  let selectNub = 0//定义一个变量记录默认选中的输入框
  let selectprice = 0//定义一个变量记录所有的小商品总价格
  inputEle.forEach(function (input) {
    //如果小商品复选框那么取出里面的值存储给列表价格
    if (input.checked) {

      //记录已选中的小商品有几件
      selectNub++
      selectprice += parseInt(input.value)
    }
  })
  //找到已经挑选几件的数据标签
  let selectedEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .selected'
  )
  //把默认选中的文本填入选择容器
  selectedEle.innerText = selectNub
  //找到右边的总价格标签
  let rightprice = document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .result .price')
  //总价 = 小商品默认选中的价格加上大包包的价格
  rightprice.innerText = '¥' + (goodsDetail.price + selectprice)



}

//11.商品规格信息初始化
function goodsSizeInit() {
  let chooseArea = document.querySelector('.wrap .con .mainCon .infoWrap .choose .chooseArea ')
  // console.log(chooseArea)
  let crumbData = goodData.goodsDetail.crumbData
  crumbData.forEach(function (info) {
    let dlNode = document.createElement('dl')
    let dtNode = document.createElement('dt')
    dtNode.innerText = info.title
    // console.log(dtNode)
    dlNode.appendChild(dtNode)
    // console.log(dlNode)
    info.data.forEach(function (dtNodes) {
      let ddNode = document.createElement('dd')
      ddNode.setAttribute('price', dtNodes.changePrice)
      ddNode.innerText = dtNodes.type
      dlNode.appendChild(ddNode)
    })

    chooseArea.appendChild(dlNode)
  })
}

//12.商品规格信息点击切换高亮显示
function goodsSizeClick() {
  //1.找到所有的dl集合

  let dlEles = document.querySelectorAll('.wrap .con .mainCon .infoWrap .choose .chooseArea dl')
  //2.循环dl集合
  // console.log(dlEles)
  dlEles.forEach(function (dlNode) {
    //3.找到dl下面的每一行dd
    let ddEles = dlNode.querySelectorAll('dd')
    //4.循环给dd绑定单机事件
    // console.log(ddEles)
    ddEles.forEach(function (ddNodes) {
      ddNodes.onclick = function (ddNode) {
        // console.log(1)
        //4.排他思想先把所有的dd的颜色去掉
        ddEles.forEach(function (dds) {
          dds.style.color = 'rgb(102,102,102)'
          //5.再给点击的dd高亮显示
        })
        this.style.color = 'red'

      }
    })

  })

}

let arr = new Array(4)
  arr.fill(0)
//13.购物车商品信息
function ShoppingDoodsPrice() {
  
  
  let dlEle = document.querySelectorAll('.wrap .con .mainCon .infoWrap .choose .chooseArea dl')
  // console.log(dlEle)
  // console.log(choosed);
  let crumbData = goodData.goodsDetail.crumbData
  // console.log(crumbData)

  dlEle.forEach(function (item, dlindex) {

    let ddEle = item.querySelectorAll('dd')
    // console.log(ddEle)
    ddEle.forEach(function (dds) {
      dds.onclick = function () {
        
        ddEle.forEach(function (dd) {
          dd.style.color = 'rgb(102,102,102)'

        })
        dds.style.color = 'red'

        let prices = parseInt(this.getAttribute('price'))
        arr[dlindex] = { name: this.innerText, price: prices }
        Totalprice()

        // console.log(arr)
        let choosed = document.querySelector('.wrap .con .mainCon .infoWrap .choose .chooseArea .choosed')
        choosed.innerHTML = ''
        // console.log(arr)

        arr.forEach(function (arrNode, arrNodeindex) {
          if (!arrNode) {
            // console.log(1)
            return
          }
          // console.log(2)
          let mark = document.createElement('mark')
          mark.innerText = arrNode.name
          // console.log(mark)
          let aNode = document.createElement('a')
          aNode.setAttribute('dlindex', arrNodeindex)
          console.log(aNode)
          aNode.innerText = 'X'
          // console.log(aNode)
          choosed.appendChild(mark)
          mark.appendChild(aNode)
          aNode.onclick = function () {
            
            let marks = this.parentNode
            choosed.removeChild(marks)
        
            let dlindex = aNode.getAttribute('dlindex')
            // console.log(dlindex)
            let dds = dlEle[dlindex].querySelectorAll('dd')

            dds.forEach(function (dd) {
              dd.style.color = 'rgb(102,102,102)'
            })
            dds[0].style.color = 'red'
            arr[dlindex] = 0
            Totalprice()
          }
        })
      }

    })
  })
}     
//14.上侧商品价格
function Totalprice(){
  let pricee=goodData.goodsDetail.price
    arr.forEach(function(arritem){
      if(arritem.price){
        pricee+=arritem.price
      }
    })
    let totalpricetop=document.querySelector('.wrap .con .mainCon .infoWrap .info1 .priceArea .priceArea1 .price em') 
    totalpricetop.innerText=pricee
    // console.log(totalpricetop)
    let lefttotalprice=document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .master p')
    lefttotalprice.innerText='¥'+ pricee
    // console.log(lefttotalprice)
    let righttotalprice=document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .result .price')
    // console.log(righttotalprice)
    let inputsEle = document.querySelectorAll(
      '.wrap .productDetail .detail .fitting .goodSuits .suits .suitsItem label input'
    )
    let inputEleNum=0
    inputsEle.forEach(function(input){
      if(input.checked){
        pricee+=parseInt(input.value)
      }
    })
    righttotalprice.innerText='¥'+ pricee

}
//15.左侧商品总价格
function inputCheckedclick(){
  let items=2
  let inputEle=document.querySelectorAll('.wrap .productDetail .detail .fitting .goodSuits .suits .suitsItem label input')
  let rightPriceNode=document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .result .price')
  inputEle.forEach(function(input){
    input.onclick=function(){
     
      // console.log(rightPriceNode);
      let rightTotalPrice = rightPriceNode.innerText 
      // console.log(rightTotalPrice)
      let rightNodePrice=parseInt(rightTotalPrice.substring(1))
      
      console.log(rightNodePrice)
      if(this.checked){
        items++
        rightNodePrice+=parseInt(this.value)
      }
      else{
        rightNodePrice-=parseInt(this.value)
        items--
      }
      rightPriceNode.innerText='¥'+rightNodePrice
      let selected=document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .result .selected')
      selected.innerText=items
    }
    
    
  })
}






 







// function Totalprice()