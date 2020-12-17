import React from "react";

class ProfileStatus extends React.Component {
    state = {editMode: false}

    toggleEditMode = () => {
        this.setState({editMode: !this.state.editMode})
    }

    render() {
        return (
            <>
                {(this.state.editMode)
                    ?
                    <div>
                        <input
                            onBlur={this.toggleEditMode}
                            value={this.props.status}
                            autoFocus={true}
                        />
                    </div>
                    :
                    <div>
                        <span onClick={this.toggleEditMode}>{this.props.status}</span>
                    </div>
                }
            </>
        )
    }
}

export default ProfileStatus