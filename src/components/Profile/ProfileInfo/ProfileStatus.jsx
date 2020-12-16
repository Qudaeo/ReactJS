import React from "react";

class ProfileStatus extends React.Component {
    state = {editMode: false}

    activateEditMode = () => {
        this.setState({editMode: true})
    }
    deactivateEditMode = () => {
        this.setState({editMode: false})
    }

    render() {
        return (
            <>
                {(this.state.editMode)
                    ?
                    <div>
                        <input
                            onBlur={this.deactivateEditMode}
                            value={this.props.status}
                            autoFocus={true}
                        />
                    </div>
                    :
                    <div>
                        <span onClick={this.activateEditMode} >{this.props.status}</span>
                    </div>
                }
            </>
        )
    }
}

export default ProfileStatus