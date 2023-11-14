import advert from "../../Media/4.jpg"
import { Link } from "react-router-dom";

const Advert2 = () => {
    return ( 
        <a href="">
            <div className="grid gap-8 text-white">
            <img src={advert} alt="" className="h-[200px] w-full rounded-md object-cover"/>
            <div className="text-center">
              <p className="inknut-font text-2xl leading-[30px]">Heading</p>
              <p className="text-sm mt-3 leading-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia autem repellat delectus fuga velit? Magnam aut eius rem accusantium possimus?</p>
            </div>
        </div>
        </a>
     );
}
 
export default Advert2;