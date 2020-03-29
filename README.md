In order to make a react app follow below steps
1)Create project using npx create-react-app my-app
2)Redux Saga -> Replaces Action creators to use function genrator to linknto store(side effects will be handled by sagas)


ComponentWillMount ->

If we want to run before jsx renders, we can directly have them as constants

ComponetWillUnMount ->
use UseEffect

ComponentDidMount -> use useEffect with empty array as dependency


We can replace connect with useSelector and useDispatch provided by react-redux module
