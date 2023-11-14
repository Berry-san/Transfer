import advert from "../../Media/1.jpg"
import { Link } from "react-router-dom";

const Advert3 = () => {
    return ( 
        <a href=""><div className="grid gap-8 text-white">
        <div className="text-center">
          <p className="inknut-font text-2xl leading-[30px]">Heading text blah blah</p>
          <p className="text-sm mt-3 leading-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia autem repellat delectus fuga velit? Magnam aut eius rem accusantium possimus?</p>
        </div>
        <img src={advert} alt="" className="h-[200px] w-full rounded-md object-cover"/>
    </div></a>
     );
}
 
export default Advert3;