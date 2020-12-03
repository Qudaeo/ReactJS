import Friends from "./Friends";
import {connect} from "react-redux";

/*
const FriendsContainer = (props) => {
 //   let friends = props.store.getState().navbarPage.friends
    return (
        <StoreContext>
            {(store) => <Friends
                    friends={store.getState().navbarPage.friends}
                />
            }
        </StoreContext>
    )
}
*/

let mapStateToProps = (state) => {
    return {
        friends: state.navbarPage.friends
    }
}

let mapDispatchToProps = () => ({})

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends)

export default FriendsContainer