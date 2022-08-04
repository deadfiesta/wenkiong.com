import React from 'react'
import { useEffect } from 'react'
import { useSpring, animated, config } from 'react-spring'
import { MdKeyboardArrowDown } from "react-icons/md";

const Navigation = ({ onclick, highlight, data, open }) => {

    const [slideLine, setSlideLine] = useSpring(()=> ({ top: 0, height: 0, config: config.slow }))
    let nav = data
    const menuHeight = 48

    useEffect(() => {
        document.querySelectorAll('.subtopic-container').forEach(sub => sub.style.height = 0)
        let li = document.querySelectorAll('.menu')
        li.forEach(l => l.classList.remove('active'))
        li[highlight].classList.add('active')

        let subcontain = li[highlight].childNodes[1]
        let len = subcontain.childNodes.length * menuHeight
        subcontain.style.height = `${len}px`;

        let h3 = document.querySelectorAll('.menu-header')
        h3.forEach(h => h.classList.remove('active'))
        h3[highlight].classList.add('active')
    }, [highlight])

    useEffect(() => {
        const anchors = document.querySelectorAll('ul.subtopic-container li span');
        anchors.forEach(anchor => {
            anchor.addEventListener('click', (ev) => {
                let an = document.getElementById(anchor.className)
                an.scrollIntoView(
                    {
                        behavior: 'smooth',
                        block: 'center',
                    }
                )
            })
        })
    }, [])

    const updateLinePos = () => {
        let selected = document.querySelector('.menu-header.active')
        selected !== null
            &&
            setSlideLine.start({ top: selected.offsetTop - document.querySelector('.menu-container').offsetTop, height: selected.clientHeight})

    }

    useEffect(() => {
        const update = setInterval(()=> {
            updateLinePos();
        },50)
        const final = setTimeout(()=> clearTimeout(update), 400)
        return ()=>clearTimeout(final)
    })

    return (
        <nav className={open ? "open" : null}>
            <div className="nav-container">
                <div className="title-container">
                    <h2>Content</h2>
                </div>
                <div className="nav-wrapper">

                    <div className="line-container">
                        <animated.span className="line" style={slideLine} />
                    </div>
                    <ul className="menu-container">
                        {nav.map((menu, i) => (
                            <li key={i} topic={i} onClick={onclick} className="menu">
                                <div className="menu-header flex-container middle between">
                                    <h3>{menu.topic}</h3>
                                    <div className='arrow'><MdKeyboardArrowDown /></div>
                                </div>
                                <animated.ul className="subtopic-container">
                                    {menu.subtopics.map((submenu, i) => (
                                        <li key={i} className={submenu.anchor}>
                                            <span className={submenu.anchor}>
                                                {submenu.title}
                                            </span>
                                        </li>
                                    ))}
                                </animated.ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </nav>
    )
}

export default Navigation