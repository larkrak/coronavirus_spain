import React from "react";
import Particles from 'react-particles-js'
import ParticlesConfig from '../../particles-config'

export default function ParticlesBackground(){

    return (
        <Particles width={'100%'} height={'auto'} canvasClassName="particles" params={ParticlesConfig} ></Particles>
    )

}