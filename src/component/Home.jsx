import React from 'react'
import {motion} from "framer-motion"
import TypeWriter from "typewriter-effect"
import {BsArrowUpRight, BsChevronDown} from "react-icons/bs"
import me from "../assets/MEIMG.png"

const Home = () => {

    const animations={
        h1:{
        initial:{
            x: "-100%",
            opacity:0,  
        },
        whileInView:{
            x:0,
            opacity:1
          }
        },
        button:{
            initial:{
                y: "-100%",
                opacity:0,  
            },
            whileInView:{
                y:0,
                opacity:1
              }
            }
    }
  return (
    <div id="home">
      <section>
      <div>
      <motion.h1 {...animations.h1}>
      Hi, I Am <br/> Sujeet Pandit.
      </motion.h1>
      <TypeWriter options={{
        strings:["A Developer", "A Passionate Developer", "A Techie"],
        autoStart: true,
        loop: true,
        cursor:" < />",
        wrapperClassName:"TypeWriterPara"
      }}/>

      <div>
      <a href='mailto:sujeet4545@gmail.com'>Hire Me</a>
      <a href='#Work'>Projects <BsArrowUpRight /></a>
      </div>

<article>
<p>
+<span>100</span>
</p>
<span>Client WorldWide</span>
</article>

<aside>
<article>
<p>
+<span>500</span>
</p>
<span>Project Made</span>
</article>

<article data-special>
<p>Contact</p>
<span>sujeet4545@gmail</span>
</article>
</aside>

</div>
</section>

<section>
<img src={me} alt="Sujeet" />
</section>

<BsChevronDown />
</div>
  )
}

export default Home
