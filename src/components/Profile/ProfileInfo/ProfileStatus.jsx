import React from "react";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    toggleEditMode = (e) => {
        this.setState({editMode: !this.state.editMode})
        this.state.editMode && this.props.updateStatus(e.currentTarget.value)
    }

    render() {

        return (
            <>
                {(this.state.editMode)
                    ?
                    <div>
                        <input
                            onBlur={this.toggleEditMode}
                            value={this.state.status}
                            onChange={(e) => {
                                this.setState({status: e.target.value})
                            }}
                            autoFocus={true}
                        />
                    </div>
                    :
                    <div>
                        <span onClick={(e) => this.toggleEditMode(e)}>{this.props.status}</span>
                    </div>
                }
            </>
        )
    }
}

export default ProfileStatus