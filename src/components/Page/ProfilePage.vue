<template>
    <div class="container">
        <div class="row" v-if="!editMode">
            <div class="mb-5">
                <img class="background-picture" :src="user.background" alt="background-picture">
            </div>
            <div class="image">
                <img class="profile-picture" :src="user.image" alt="profile-picture">
            </div>
            <div class="col-6 offset-3 mt-5">
                <h1>{{user.pseudo}}</h1>
            </div>
            <div class="col-1">
                <button @click="edit" class="btn btn-primary">{{ $t("profilePage.edit") }}</button>
            </div>
            <div class="col-12 mt-3">
                <span>{{ $t("profilePage.info") }}</span><br>
                <p>{{user.info}}</p>
            </div>
        </div>
        <div class="row" v-if="editMode">
            <div class="mb-5 clickable">
                <img @click="openFileExplorer('background')" class="background-picture" :src="user.background" alt="background-picture">
                <!-- <i class="fa-solid fa-camera"></i> -->
            </div>
            <div class="image">
                <img @click="openFileExplorer('picture')" class="profile-picture clickable" :src="user.image" alt="profile-picture">
                <!-- <i class="camera-picture fa-solid fa-camera"></i> -->
            </div>
            <div class="col-6 offset-3 mt-5">
                <textarea class="mt-2" v-model="user.pseudo" :placeholder="user.pseudo" rows="1" cols="30" maxlength="24">Write stuff here...</textarea>
                {{user.pseudo.length}}/24
            </div>
            <div class="col-1">
                <button @click="save" class="btn btn-primary">{{ $t("profilePage.save") }}</button>
            </div>
            <div class="col-6 mt-3 offset-3">
                <span>{{ $t("profilePage.info") }}</span><br>
                <textarea v-model="user.info" :placeholder="user.info" rows="5" cols="80" maxlength="300">Write stuff here...</textarea>
                {{user.info.length}}/300
            </div>
        </div>
        <div class="row">
            <div class="row">
                <div class="col-3 offset-3">
                    <span>{{ $t("profilePage.comments") }}</span><br>
                    <p>{{user.comments}}</p>
                </div>
                <div class="col-3">
                    <span>{{ $t("profilePage.likes") }}</span><br>
                    <p>{{user.likes}}</p>
                </div>
            </div>
            <div class="col-12">
                <span>{{ $t("profilePage.favoriteCity") }}</span><br>
                <p>{{user.favoriteCity}}</p>
            </div>
            <div class="col-12">
                <span>{{ $t("profilePage.lastPlaceVisited") }}</span><br>
                <p>{{user.lastPlaceVisited}}</p>
            </div>
            <div class="col-12">
                <span>{{ $t("profilePage.lastEventAttended") }}</span><br>
                <p>{{user.lastEventAttended}}</p>
            </div>
            <div class="col-12">
                <span>{{ $t("profilePage.totalKm") }}</span><br>
                <p>{{user.totalKm}}</p>
            </div>
            <div class="col-12 mb-3">
                <span>{{ $t("profilePage.cityPass") }}</span><br>
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                        <img :src="user.cityPass.img1" class="cityPass" alt="...">
                        </div>
                        <div class="carousel-item">
                        <img :src="user.cityPass.img2" class="cityPass" alt="...">
                        </div>
                    </div>
                    <button class="carousel-control-prev black" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        <cards-reviews class="col-4 mb-3" :username="user.pseudo" :review="user.info"/>
        <cards-reviews class="col-4" :username="user.pseudo" :review="user.info"/>
        <cards-reviews class="col-4" :username="user.pseudo" :review="user.likes"/>
        </div>
    </div>
</template>

<script>
import CardReviews from '../Cards-reviews.vue';
    export default {
        data () {
            return {
                editMode: false,
                user : {
                    pseudo: "Jyzo",
                    info: "Ma plus grande passion: découvrir le monde !",
                    comments: "86",
                    likes: "258",
                    favoriteCity: "Nancy",
                    lastPlaceVisited: "Place Stanislas",
                    lastEventAttended: "Christmas Market",
                    totalKm: "105.3 km",
                    cityPass: {
                        //loop to get all citypass, just push it inside this array
                        img1 : "https://nancybuzz.fr/wp-content/uploads/2020/08/nancy-city-pass-office-tourisme-solo.jpg",
                        img2 : "https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
                    },
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXFxcX////CwsLHx8fz8/P5+fnm5ubLy8vb29v39/fh4eHw8PDT09Ps7OzJycn8/PzW1taDZ0PNAAAFXklEQVR4nO2dB7arOgxFiagJdf6jfSFcfkilSLKO87VHwFm21SyLJHEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcxwJaYP0t0oya0qYq2mykLS5DmfyOTErKZjifXsmLpkyT6GVSWRXv5E307aWJWiNRU+cf5f2JzKpYtyul5bCibqZtughFUtmuLd+CurL+3r0QVTv03dYxjWsZh36fvpvGMhqN1LT79V05XyKRuHuD3imiMKvdsQX8W8YBX2JZMwReQTeqVGY8gacT9mGkiqvvSmut4hsSAq/2BtZtiKzgSJ1aS3mPmEDYjVqKCbyaG2sx7+Bb0QV9hXcUU6YffAbO9VMhK/CUd9aSHqGtye52amtNjzSHg+3PYFkb6T06kjfWqhbI79GRGsfYkMIeHYGxp4LBzCMZij0tlZYQJ5PSMDMTeWmt7Ub5uWrPBiJ4U3D2dzIIhWqncGSwlpfIJk2vAPhE4hQP1wGwNalkWvgGc1uj5u1nWuuaDV2UFWbW27RT3qSnk3WGUR64RttHYXsQVd39xNlYoa6vuGGsUDWgmbA1pqQv0DgPDqGwNVWYBlBoml+oRzQjZ0OB+hHNTaGlqRGv5b9VaFmPIvWYzRW6QleIodAyQwwReBt7i9/3h0FiGtPkQrdYOmFb9w6RW/y+QtuK6f8gx//9Oo2+u+iNy/r6xtT69knzAnjCvCFDOwc2v15TP4i1eceJ9ja1724j4b7SJ/LG+hgmSaOqEKEZQzdwQ+iKUs2gcgCBmm1tGEuYJKlebNpbX3FPUKN2011Ya5vRimvOGEuY6JlT826h/1AK3TAM6USnEdj05lnFAhWfiPWATUEiTBv7H/IBOEDI/Yh0ZIMRzSwh2adPML5+ieRRtM/s3yHYttBbt81+QMzxm96JfiWVWcUMzowuEFlFyDM4QxU7kzJvXV+DmywW0Cs4Qg2rgHpBX8FkHIJ1vKpRw878eISqY8vYxzPvi8ojbiNHeKe2GSr3btXzEMUUrBlKqmKnTa2riEZEUloc6XfLijiOIXXD8Xa+bIAfEXndnrxkH32zUsMvZtS4cfd1f8oUa2rQvUrcaXtLjYCxDSWFZJ0mL+COo/gIHqjpNAejtDWARu9RqnMLnINEANTpNQ1dEIwqqdw7zdT2Epkp/Spna/8vUHlawXi+YJDXCJYSgzw/tJw5oNhI84hVCXV3oYIh0eQiQ3qc51cs5u5qT955IgsuMdgZnAl9FoXu0fZQBJUYyE08SQzoNII8rHwlXHtGkEjmHaGiG8V+0hX6QGG4/miozxKDeP4g77c/EWJWjYkZvaNvUOnIX4AE0W867Uz1jWh3MoQMt9+jPKvdxtU/ovqarQvwdHsVzX8KhHibvgG9Hn6zaO0ZtehN8wnXLtTeBtv6+iVKPdK6j0X3oXL1pvzgdx8qYwiQllBlEWHMzIS8sYHxFDPiHkN//sVOpPv54ZZQfBFDTEvai6hCo/Lhd0SLix3aKRyRnKeof5d9BMn77+DXMNsQvKzBCmfuiAU2kHZmRM7WWCv5iJA+QG8/I2VrkNKmR4Qqixp/bxRCpgkV1s6MiNga1d5DLiJvvs3uQ7cgMYQIepOKbFNCDLrvCPxnJ8QsZA7sVB98kwpsU6gq6TvYlVOwIuIr3LKiXe/MVrg9NvDHkH0QQbP7JcxMH64Q/AqzNIzuDUdYCoGT3zusNNi0h20rrF438KB0ghWaIl5XvMJyF9YfvwnOEsZgaFimJoKIZoQR1QT5YRUfzlTzSBQeF/j7CiOISkcYkSlwtXvJ8cq3ddf6Vo53t0fiDhkOMRJ3yHGIOA2l3zncbhpBCWPicCHjNxT+A7hBYW0zNQIyAAAAAElFTkSuQmCC",
                    background: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXFxcX////CwsLHx8fz8/P5+fnm5ubLy8vb29v39/fh4eHw8PDT09Ps7OzJycn8/PzW1taDZ0PNAAAFXklEQVR4nO2dB7arOgxFiagJdf6jfSFcfkilSLKO87VHwFm21SyLJHEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcxwJaYP0t0oya0qYq2mykLS5DmfyOTErKZjifXsmLpkyT6GVSWRXv5E307aWJWiNRU+cf5f2JzKpYtyul5bCibqZtughFUtmuLd+CurL+3r0QVTv03dYxjWsZh36fvpvGMhqN1LT79V05XyKRuHuD3imiMKvdsQX8W8YBX2JZMwReQTeqVGY8gacT9mGkiqvvSmut4hsSAq/2BtZtiKzgSJ1aS3mPmEDYjVqKCbyaG2sx7+Bb0QV9hXcUU6YffAbO9VMhK/CUd9aSHqGtye52amtNjzSHg+3PYFkb6T06kjfWqhbI79GRGsfYkMIeHYGxp4LBzCMZij0tlZYQJ5PSMDMTeWmt7Ub5uWrPBiJ4U3D2dzIIhWqncGSwlpfIJk2vAPhE4hQP1wGwNalkWvgGc1uj5u1nWuuaDV2UFWbW27RT3qSnk3WGUR64RttHYXsQVd39xNlYoa6vuGGsUDWgmbA1pqQv0DgPDqGwNVWYBlBoml+oRzQjZ0OB+hHNTaGlqRGv5b9VaFmPIvWYzRW6QleIodAyQwwReBt7i9/3h0FiGtPkQrdYOmFb9w6RW/y+QtuK6f8gx//9Oo2+u+iNy/r6xtT69knzAnjCvCFDOwc2v15TP4i1eceJ9ja1724j4b7SJ/LG+hgmSaOqEKEZQzdwQ+iKUs2gcgCBmm1tGEuYJKlebNpbX3FPUKN2011Ya5vRimvOGEuY6JlT826h/1AK3TAM6USnEdj05lnFAhWfiPWATUEiTBv7H/IBOEDI/Yh0ZIMRzSwh2adPML5+ieRRtM/s3yHYttBbt81+QMzxm96JfiWVWcUMzowuEFlFyDM4QxU7kzJvXV+DmywW0Cs4Qg2rgHpBX8FkHIJ1vKpRw878eISqY8vYxzPvi8ojbiNHeKe2GSr3btXzEMUUrBlKqmKnTa2riEZEUloc6XfLijiOIXXD8Xa+bIAfEXndnrxkH32zUsMvZtS4cfd1f8oUa2rQvUrcaXtLjYCxDSWFZJ0mL+COo/gIHqjpNAejtDWARu9RqnMLnINEANTpNQ1dEIwqqdw7zdT2Epkp/Spna/8vUHlawXi+YJDXCJYSgzw/tJw5oNhI84hVCXV3oYIh0eQiQ3qc51cs5u5qT955IgsuMdgZnAl9FoXu0fZQBJUYyE08SQzoNII8rHwlXHtGkEjmHaGiG8V+0hX6QGG4/miozxKDeP4g77c/EWJWjYkZvaNvUOnIX4AE0W867Uz1jWh3MoQMt9+jPKvdxtU/ovqarQvwdHsVzX8KhHibvgG9Hn6zaO0ZtehN8wnXLtTeBtv6+iVKPdK6j0X3oXL1pvzgdx8qYwiQllBlEWHMzIS8sYHxFDPiHkN//sVOpPv54ZZQfBFDTEvai6hCo/Lhd0SLix3aKRyRnKeof5d9BMn77+DXMNsQvKzBCmfuiAU2kHZmRM7WWCv5iJA+QG8/I2VrkNKmR4Qqixp/bxRCpgkV1s6MiNga1d5DLiJvvs3uQ7cgMYQIepOKbFNCDLrvCPxnJ8QsZA7sVB98kwpsU6gq6TvYlVOwIuIr3LKiXe/MVrg9NvDHkH0QQbP7JcxMH64Q/AqzNIzuDUdYCoGT3zusNNi0h20rrF438KB0ghWaIl5XvMJyF9YfvwnOEsZgaFimJoKIZoQR1QT5YRUfzlTzSBQeF/j7CiOISkcYkSlwtXvJ8cq3ddf6Vo53t0fiDhkOMRJ3yHGIOA2l3zncbhpBCWPicCHjNxT+A7hBYW0zNQIyAAAAAElFTkSuQmCC"
                },
            }
        },
        methods: {
            openFileExplorer(imageOrBackground) {
                const fileExplorer = document.createElement('input');
                fileExplorer.setAttribute('type', 'file');
                fileExplorer.setAttribute('accept', 'image/*');
                fileExplorer.click();
                fileExplorer.onchange = () => {
                    const file = fileExplorer.files[0];
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                        console.log(imageOrBackground)
                        const result = fileReader.result;
                        if (imageOrBackground === 'background') {
                            console.log(imageOrBackground)
                            this.user.background = result;
                        }
                        else if (imageOrBackground === 'picture') {
                            console.log(imageOrBackground)
                            this.user.image = result;
                        }
                    }
                    fileReader.readAsDataURL(file);
                }
            },
            edit() {
                this.editMode = true
            },
            save() {
                this.editMode = false
                //envoyer a l'api
                
            },
        },
        components: {
            'cards-reviews': CardReviews
        },
}
</script>

<style scoped>
.profile-picture {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px solid black;
}
.background-picture {
    width: 100%;
    height: 200px;
    border: 1px solid black;
}

.cityPass {
    width: auto;
    height: 400px;
}
.clickable {
    cursor: pointer;
}

p {
    color: #c09628;
}

div {
    position: relative;
}
.image {
    position: absolute;
    margin-top: 100px;
}

textarea {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
}
/* .camera-picture {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 50px;
    height: 50px;
}

.camera-background {
    position: absolute;
    top: 0;
    right: 10;
    bottom: 0;
    left: 10;
    margin: auto;
    width: 50px;
    height: 50px;
} */

.carousel-control-next {
    filter: invert(100%);
}
.carousel-control-prev {
    filter: invert(100%);
}

</style>
