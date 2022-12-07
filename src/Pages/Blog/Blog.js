import React from 'react';
import useTitle from '../../hooks/UseTitle';

const Blog = () => {

    useTitle('Blog')
    return (
        <div>
            <section className="container w-9/12 m-auto mt-5 text-center">
                <h1 className='text-2xl font-extrabold'>Some question answer blog about React</h1>
                <div className="container mt-4 mb-5 text-center">
                    <h4 className='text-xl mb-2 font-extrabold'> What are the different ways to manage a state in a React application?</h4>

                    <p>There are some different ways to manage state e.g. local state,
                        global state,
                        server state and url state etc.
                        First of all useState hook is used to mananage local state. Secondly,
                        to manage multiple components we use global state. Thirdly, server
                        state manages external server data there are some tools like useEffect and useQuery.
                        Finally, we can say about URL state which manage data exists in URL with pathname and query
                        parameter.
                        <br />
                        Besides all of these there lots of state management tools now a days
                        such as  Redux, MobX, Akita, Recoil, and Zustand.
                        Among them React Redux is so popular which is considered to a magic enabling
                        straightfowward state connection.</p>
                    <h4 className="text-xl mt-5 mb-2 font-extrabold">How does prototypical inheritance work?</h4>


                    <p>Defining JavaScript's prototypical inheritance it has one construct: objects.
                        A link of private property is hold by every object to another object meant its prototype.
                        Every prototype object has its own
                        prototype till reaching with null as its prototype.
                        To define null which has no prototype, and does till the final link.

                        An inherited function acts just as any other property, When an
                        inherited function is executed,
                        the value of this points to the inheriting object,
                        not to the prototype object where the function is an own property.
                        The power of prototypes is that we can reuse a set of properties
                        if they should be present on every instance — especially for methods.</p>

                    <h4 className="text-xl mt-5 mb-2 font-extrabold"> What is a unit test? Why should we write unit tests?</h4>

                    <p>Unit Test is performed to test ability of software by programable modules and operating process.
                        <br />
                        The objective of Unit Testing such as
                        isolating a section of code, verifying the correctness of the code, testing every function and procedure ,
                        fixing bugs early in the development cycle and to save costs.
                        helping the developers to understand the code base and enable them to
                        make changes quickly and helping with code reuse etc.</p>
                    <h4 className="text-xl mt-5 mb-2 font-extrabold">React vs. Angular vs. Vue?</h4>

                    <p>Vue provides higher customizability and hence is easier to learn than Angular or React.
                        Further, Vue has an overlap with Angular and React with respect to their functionality like the
                        use of components.
                        Hence, the transition to Vue from either of the two is an easy option.

                        Vue JS is Perfect for dynamic and single page applications , react perfect for dynamic and single page applications and angular
                        perfect for dynamic and single page applications.  Vue.js has libraries with limited functionality, which can be
                        extended through third-party services.There’s a wider variety of third-party services for React due
                        to the library’s bigger popularity. Angular has Monolithic framework with extensive functionality out of the box,
                        making Angular applications more heavyweight.
                    </p>


                </div>
            </section>
        </div>
    );
};

export default Blog;