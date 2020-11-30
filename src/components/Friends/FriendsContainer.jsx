import Friends from "./Friends";
import React from "react";
import StoreContext from "../../StoreContext";

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

export default FriendsContainer