

class SampleController {
    sample(data,token_data){
        return new Promise((resolve,reject)=>{
            try{
                resolve("Sample response")
            }catch(err){
                reject(err)
            }
        })
    }
}


module.exports = () => {
    return new SampleController()
}