/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';

function MealList() {

    return (
        <div>
            <Link to="/">
                    <button type="button" className="btn btn-primary">
                        Go to SmartEater Home
                    </button>
                </Link>
        </div>

    )
}

export default MealList;