export default function deleteNonIntegerSymbol (data){
    data = data.replace(/\D/g, "")
    return(data)
}