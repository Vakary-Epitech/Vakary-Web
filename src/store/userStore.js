const userStore = {
    state: {
        userId: "",
        userInfo: {},
        currentUserLocation: {
            latitude: 0,
            longitude: 0,
        },
        mail: "",
        userIsLoggedIn: true,
        username: "",
        groups: [],
        userProfileImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXFxcX////CwsLHx8fz8/P5+fnm5ubLy8vb29v39/fh4eHw8PDT09Ps7OzJycn8/PzW1taDZ0PNAAAFXklEQVR4nO2dB7arOgxFiagJdf6jfSFcfkilSLKO87VHwFm21SyLJHEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcxwJaYP0t0oya0qYq2mykLS5DmfyOTErKZjifXsmLpkyT6GVSWRXv5E307aWJWiNRU+cf5f2JzKpYtyul5bCibqZtughFUtmuLd+CurL+3r0QVTv03dYxjWsZh36fvpvGMhqN1LT79V05XyKRuHuD3imiMKvdsQX8W8YBX2JZMwReQTeqVGY8gacT9mGkiqvvSmut4hsSAq/2BtZtiKzgSJ1aS3mPmEDYjVqKCbyaG2sx7+Bb0QV9hXcUU6YffAbO9VMhK/CUd9aSHqGtye52amtNjzSHg+3PYFkb6T06kjfWqhbI79GRGsfYkMIeHYGxp4LBzCMZij0tlZYQJ5PSMDMTeWmt7Ub5uWrPBiJ4U3D2dzIIhWqncGSwlpfIJk2vAPhE4hQP1wGwNalkWvgGc1uj5u1nWuuaDV2UFWbW27RT3qSnk3WGUR64RttHYXsQVd39xNlYoa6vuGGsUDWgmbA1pqQv0DgPDqGwNVWYBlBoml+oRzQjZ0OB+hHNTaGlqRGv5b9VaFmPIvWYzRW6QleIodAyQwwReBt7i9/3h0FiGtPkQrdYOmFb9w6RW/y+QtuK6f8gx//9Oo2+u+iNy/r6xtT69knzAnjCvCFDOwc2v15TP4i1eceJ9ja1724j4b7SJ/LG+hgmSaOqEKEZQzdwQ+iKUs2gcgCBmm1tGEuYJKlebNpbX3FPUKN2011Ya5vRimvOGEuY6JlT826h/1AK3TAM6USnEdj05lnFAhWfiPWATUEiTBv7H/IBOEDI/Yh0ZIMRzSwh2adPML5+ieRRtM/s3yHYttBbt81+QMzxm96JfiWVWcUMzowuEFlFyDM4QxU7kzJvXV+DmywW0Cs4Qg2rgHpBX8FkHIJ1vKpRw878eISqY8vYxzPvi8ojbiNHeKe2GSr3btXzEMUUrBlKqmKnTa2riEZEUloc6XfLijiOIXXD8Xa+bIAfEXndnrxkH32zUsMvZtS4cfd1f8oUa2rQvUrcaXtLjYCxDSWFZJ0mL+COo/gIHqjpNAejtDWARu9RqnMLnINEANTpNQ1dEIwqqdw7zdT2Epkp/Spna/8vUHlawXi+YJDXCJYSgzw/tJw5oNhI84hVCXV3oYIh0eQiQ3qc51cs5u5qT955IgsuMdgZnAl9FoXu0fZQBJUYyE08SQzoNII8rHwlXHtGkEjmHaGiG8V+0hX6QGG4/miozxKDeP4g77c/EWJWjYkZvaNvUOnIX4AE0W867Uz1jWh3MoQMt9+jPKvdxtU/ovqarQvwdHsVzX8KhHibvgG9Hn6zaO0ZtehN8wnXLtTeBtv6+iVKPdK6j0X3oXL1pvzgdx8qYwiQllBlEWHMzIS8sYHxFDPiHkN//sVOpPv54ZZQfBFDTEvai6hCo/Lhd0SLix3aKRyRnKeof5d9BMn77+DXMNsQvKzBCmfuiAU2kHZmRM7WWCv5iJA+QG8/I2VrkNKmR4Qqixp/bxRCpgkV1s6MiNga1d5DLiJvvs3uQ7cgMYQIepOKbFNCDLrvCPxnJ8QsZA7sVB98kwpsU6gq6TvYlVOwIuIr3LKiXe/MVrg9NvDHkH0QQbP7JcxMH64Q/AqzNIzuDUdYCoGT3zusNNi0h20rrF438KB0ghWaIl5XvMJyF9YfvwnOEsZgaFimJoKIZoQR1QT5YRUfzlTzSBQeF/j7CiOISkcYkSlwtXvJ8cq3ddf6Vo53t0fiDhkOMRJ3yHGIOA2l3zncbhpBCWPicCHjNxT+A7hBYW0zNQIyAAAAAElFTkSuQmCC",
    },
    mutations: {
        UPDATE_USER_LOCATION(state, coords) {
            console.log("User Coords:", coords.latitude, coords.longitude);
            state.currentUserLocation.latitude = 48.8610061;
            state.currentUserLocation.longitude = 2.3359302999999727;
        },
        USER_CAN_LOG_IN(state, mail) {
            state.userIsLoggedIn = true;
            state.mail = mail;
        },
        UPDATE_USER_INFO(state, userInfo) {
            state.userInfo = userInfo;
            state.userId = userInfo.data.user.id;
        },
    },
};

export default userStore;