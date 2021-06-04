const fs = require('fs')


try{
    const data=JSON.parse(fs.readFileSync('./package.json','utf-8'))
    console.log(data)
    try{
        fs.writeFileSync('./info.txt',JSON.stringify(data))
        try{
            const info=fs.readFileSync('./info.txt','utf-8')
            console.log("Esta es la forma 1")
            console.log(info)
            console.log("..........................................")
        }catch (error){
            console.log('Error: No existe', error)
        } 
    }catch (error){
        console.log('Error: No existe', error)
    }  
}catch (error){
    console.log('Error: No existe', error)
} 

fs.readFile('./package.json','utf-8',(error,contenido)=>{
    if(error){
        console.log(error)
    }else{
        fs.writeFile('./info.txt',JSON.stringify(contenido),(error)=>{
            if(error){
                console.log(error)
            }else{
                fs.readFile('./info.txt','utf-8',(error,contenido)=>{
                    if(error){
                        console.log(error)
                    }else{
                        console.log("Esta es la forma 2")
                        console.log(contenido)                        
                    }
                })        
            }
        })
    }
})