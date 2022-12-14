import React from 'react'

const Header = () => {
  return (
    <nav>
    <NavContent />
    </nav>
  )
}

const NavContent =() => (
  <>
  <h2>Sujeet Pandit</h2>
  <div>
  <a href='#Home'><button>Home</button></a>
  <a href='#Experience'><button>Experience</button></a>
  <a href='#CV'><button>CV</button></a>
  <a href='#Contact'><button>Contact</button></a>
  </div>

  <a href='mailto:sujeet4545@gmail.com'><button>E-mail</button></a>
  
  </>
)


export default Header

